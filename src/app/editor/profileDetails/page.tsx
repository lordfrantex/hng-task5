'use client'
import Image from "next/image"
import { KeyboardEvent, ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { auth, db, storage } from "@/components/firebaseConfig"
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { set, ref as dbRef } from "firebase/database"
import { useAuthLink } from "@/context/AuthContext"
import { useLink } from "@/context/LinkContext"
import { reauthenticateWithCredential, sendEmailVerification, updateEmail, } from "firebase/auth"
import { EmailAuthProvider } from "firebase/auth/web-extension"
import { toast } from "react-toastify";
const Page = () => {
    const { fetchInitialAuthData, loading, authDispatch, authState } = useAuthLink()
    const { fetchInitialData } = useLink()
    const previewRef = useRef<HTMLDivElement>(null);
    const [user] = useAuthState(auth);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("")
    const [userProfile, setUserProfile] = useState(authState.profile);
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [imageDimensions, setImageDimensions] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')


    // const [updateEmail] = useUpdateEmail(auth);
    useEffect(() => {
        setUserProfile(authState.profile)
    }, [authState.profile]);

    useEffect(() => {
        authState.profile.id && fetchInitialData(authState.profile.id)
    }, [authState.profile.id])

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function isValidEmail(email: string): boolean {
            return emailRegex.test(email);
        }
        if (!isValidEmail(userProfile.email)) {
            setUploadError('Invalid Email Address');
            setTimeout(() => setUploadError(''), 3000)
            return
        }
        if (!userProfile.firstName || !userProfile.lastName) {
            setUploadError('Firstname or Lastname cannot be Empty');
            setTimeout(() => setUploadError(''), 3000)
            return
        }

        if (user) {
            setModalOpen(true)
        }
    }

    const setExecute = async () => {
        // storage
        const fileRef = ref(storage, `user-profiles/${userProfile?.id}`);

        if (selectedFile) {
            const snapshot = await uploadBytes(fileRef, selectedFile)
        }

        if (user) {

            try {
                //   Reauthenticate the user
                const credential = EmailAuthProvider.credential(user.email!, confirmPassword);
                const res = await reauthenticateWithCredential(user, credential);
                if (!res) {
                    toast("auth/invalid-credential")
                    return
                }

                // Send email verification if the email has changed
                if (user.email !== userProfile.email) {
                    await sendEmailVerification(user);
                    setUploadError("A verification email has been sent to your new email address. Please verify it to update your email.");
                    setTimeout(() => setUploadError(''), 5000)
                    return;
                }

                // Update profile and email
                const newPhotoURL = selectedFile && await getDownloadURL(fileRef);
                await updateProfile({
                    displayName: `${userProfile.firstName} ${userProfile.lastName}`,
                    photoURL: newPhotoURL,
                });

                if (user.email !== userProfile.email) {
                    await updateEmail(user, userProfile.email);
                }


                // Save  user info in the Realtime Database
                await set(dbRef(db, `/users/${userProfile.id}`), {
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    url: newPhotoURL,
                    id: userProfile?.id
                });
                setModalOpen(false)
                toast("Your profile has been updated.")
            } catch (err) {
                console.log(err);
            }
        }
    }

    if (previewRef.current) {
        previewRef.current.style.background = `url('${userProfile.url}')`;
        if (selectedFile) {
            previewRef.current.style.background = `url('${previewSrc}')`;
        }
        previewRef.current.style.backgroundColor = '#efebff';
        previewRef.current.style.backgroundSize = 'cover';
        previewRef.current.style.backgroundPosition = 'center';
    }

    const createImgUrl = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = () => {
                const img = document.createElement('img'); // Create an image element
                img.src = reader.result as string;

                img.onload = () => {
                    if (img.width > 1024 || img.height > 1024) {
                        setImageDimensions(true)
                        setTimeout(() => setImageDimensions(false), 3000)
                        return
                    } else {
                        setPreviewSrc(reader.result as string);
                        setSelectedFile(file);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            {modalOpen && <Modal setExecute={setExecute} open={modalOpen} setModalOpen={setModalOpen} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />}
            <div className=" p-6 md:p-10">
                <div className="">

                    <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Profile Details</h2>
                    <p className="font-normal text-custom_deep_gray mb-10">Add your details to create a personal touch to your profile.</p>
                </div>
                <div className="flex gap-4 flex-wrap items-center mb-6 cursor-pointer bg-custom_offwhite rounded-xl p-5 justify-between">
                    <p>Profile picture</p>
                    <div className="flex flex-wrap items-center  gap-6">
                        <input type="file" id="upload_img" className="hidden" onChange={createImgUrl} />
                        <label htmlFor="upload_img" >
                            <div ref={previewRef} className={` px-10 py-[60px] grid gap-2 cursor-pointer bg-custom_light_blue2 rounded-xl text-center`}>
                                <Image alt="" src='/pics/ph_image.png' width={40} height={40} className="m-auto" />
                                <p className="text-custom_blue font-semibold">+ Upload Image</p>
                            </div>
                        </label>
                        <p className={`text-[12px] text-custom_deep_gray max-w-[215px] ${imageDimensions ? "font-extrabold text-custom_red" : ""}`}>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                    </div>

                </div>

                <div className="bg-custom_offwhite rounded-xl p-5 grid gap-3 ">
                    <div className="block sm:flex items-center justify-between ">
                        <span className="mb-1 block text-custom_dark">First name <sup>*</sup></span>
                        <div className="flex md:w-3/4 border bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            {/* <input onChange={(e) => dispatch({ type: "FIRST_NAME", payload: e.target.value })} value={state.userInfo.firstName} type="text" className="outline-none font-semibold text-custom_dark  bg-transparent" placeholder="e.g John" /> */}
                            <input onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))} value={userProfile.firstName} type="text" className="outline-none font-semibold text-custom_dark  bg-transparent" placeholder="e.g John" />
                            {!userProfile.firstName && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can&apos;t be empty</span>}

                        </div>
                    </div>

                    <div className="block sm:flex items-center justify-between ">
                        <span className="mb-1 block text-custom_dark">Last name <sup>*</sup></span>
                        <div className=" flex border bg-white items-center w-full md:w-3/4  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))} value={userProfile.lastName} type="text" className="outline-none font-semibold text-custom_dark bg-transparent " placeholder="e.g. Appleseed" />
                            {!userProfile.lastName && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can&apos;t be empty</span>}
                        </div>

                    </div>
                    <div className=" block sm:flex items-center justify-between ">
                        <span className="mb-1 block text-custom_dark">Email</span>
                        <div className=" flex  border md:w-3/4 bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))} value={userProfile.email} type="email" className="outline-none font-semibold text-custom_dark bg-transparent " placeholder="e.g email@example.com" />
                            {!userProfile.email && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can&apos;t be empty</span>}

                        </div>
                    </div>

                </div>
                {uploadError && <p className="text-red-600">{uploadError}</p>}
            </div>
            <div className="flex py-6 px-10 border-t">
                <button onClick={handleSubmit} className="ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]">Save</button>
            </div>
        </div>
    )
}

export default Page

const Modal = ({ open, setModalOpen, confirmPassword, setConfirmPassword, setExecute }:
    {
        open: boolean,
        setModalOpen: Dispatch<SetStateAction<boolean>>,
        setExecute: () => any,
        confirmPassword: string,
        setConfirmPassword: Dispatch<SetStateAction<string>>,
    }) => {

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setExecute()
        }
    }

    return (
        open && (
            <div className="bg-custom_light_gray fixed h-[200px] grid items-center g-4  rounded-lg p-4 left-2/4 top-2/4 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[400px]">

                <div className="">
                    <input className="w-full p-2 rounded-lg" type="password" onKeyPress={handleKeyPress} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter your password to confirm changes" />
                </div>
                <div className="flex gap-2">
                    <button className="flex-1  p-2 rounded-lg " onClick={() => setModalOpen(false)}>Close</button>
                    <button className="flex-1 text-white bg-custom_blue p-2 rounded-lg" onClick={() => setExecute()}>Send</button>
                </div>
            </div>
        )
    )
}