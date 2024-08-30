'use client'
import { get, onValue, ref } from "firebase/database";
import Image from "next/image"
import { auth, db } from "./firebaseConfig";
import { ArrowRight } from "lucide-react";
import { useLink } from "@/context/LinkContext";
import { useEffect, useState } from "react";
import { useAuthLink } from "@/context/AuthContext";
import { useAuthState } from 'react-firebase-hooks/auth';

import useFirebaseFetch from "@/utilities/FetchDB";
import LinkList from "./LinkList";
// import { determineColor } from "@/app/preview/page";
import Link from "next/link";
import { determineColor } from "./determineColor";
type LinkType = {
    name: string;
    link: string;
    id: string;
};
type ProfileType = {
    email: string;
    firstName: string;
    lastName: string;
    url: string;
};


const PhoneMockup = () => {
    const { state, fetchInitialData } = useLink()
    const [user] = useAuthState(auth)
    const { authDispatch, authState, fetchInitialAuthData } = useAuthLink()
    const [profile, setProfile] = useState<ProfileType>(authState.profile)

    useEffect(() => {
        user?.uid && fetchInitialAuthData(user.uid);
    }, [user?.uid]);
    useEffect(() => {
        setProfile(authState.profile)
    }, [authState.profile]);




    const { data: itemData, error: itemError, loading: itemLoading } = useFirebaseFetch('/items')

    const { data: userData, error: userError, loading: userLoading } = useFirebaseFetch('/users')

    const skeletonLinks = (
        <>
            <button className="h-[44px] animate-pulse bg-custom_light_red rounded-lg w-[237px] block"></button>
            <button className="h-[44px] animate-pulse bg-custom_light_red rounded-lg w-[237px] block"></button>
            <button className="h-[44px] animate-pulse bg-custom_light_red rounded-lg w-[237px] block"></button>
            <button className="h-[44px] animate-pulse bg-custom_light_red rounded-lg w-[237px] block"></button>
        </>
    )


    const mapLinks = state.links && state.links.length > 0 ? state.links.map((link, i) => {

        const bgColor = determineColor(link.name)

        return (
            <Link href={link.link} target="_blank" style={{ backgroundColor: bgColor }} key={link.id} className="text-white bg-custom_light_red rounded-lg w-full flex items-center gap-2 justify-between py-[13px] px-4">
                <div className="flex items-center gap-2">
                    <LinkList {...link} color="white" />
                    {link.name}
                </div>
                <div className="flex items-center gap-2">
                    <ArrowRight height={16} width={16} />
                </div>

            </Link>
        )
    }) : skeletonLinks

    return (
        <div>
            <div className=" border-custom_deep_gray border h-[600px] w-[307px]  py-[43.5px] px-[34.5px] rounded-[50px]">
                <div className="mb-[56px]  ">
                    {/* <Image alt="" src='/pics/Subtract.png' width={307} height={631} className="" /> */}
                    {

                        profile?.url ? <Image src={profile?.url} alt="" width={96} height={96} className="rounded-full  mb-[25px] border-[4px] border-custom_blue w-[96px] h-[96px] bg-custom_light_red m-auto bg-cover " /> :
                            <div className="circle w-[96px]  animate-pulse h-[96px] mb-[25px]  rounded-full bg-custom_light_red m-auto"></div>
                    }
                    {
                        profile?.firstName && profile?.lastName ?
                            <p className="mb-[13px] m-auto text-center"> {profile?.firstName} {profile?.lastName}</p>
                            :
                            <p className="w-[160px] h-4 rounded-full animate-pulse  bg-custom_light_red mb-[13px] m-auto"></p>
                    }
                    {

                        profile?.email && profile?.email ?
                            <p className=" m-auto text-center"> {profile?.email}</p>
                            :
                            <p className=" w-[72px] h-2 rounded-full animate-pulse  bg-custom_light_red m-auto"></p>

                    }
                </div>
                <div className="grid gap-5 max-h-[270px] overflow-x-hidden  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-white scrollbar-track-rounded-full  scrollbar-thumb-rounded-full">{mapLinks}</div>
            </div>
        </div>
    )
}

export default PhoneMockup