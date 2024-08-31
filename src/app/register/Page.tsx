
'use client'
import { auth, db } from '@/components/firebaseConfig'
import { useAuthLink } from '@/context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const Page = () => {
    const router = useRouter()
    const { authDispatch } = useAuthLink()


    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })


    const [errormsg, setErrorMsg] = useState('')

    const validateInput = () => {

        if (!formValues.email) {
            setErrorMsg("Email is required");
            return false
        }
        if (!formValues.password) {
            setErrorMsg("Password is required");
            return false

        }
        if (formValues.password.length < 8) {
            setErrorMsg("Password must be at least 8 characters long");
            return false
        }
        if (formValues.password !== formValues.confirmPassword) {
            setErrorMsg("Password do not match");
            return false
        }
        setErrorMsg('')

        return true;
    };

    const handleSubmit = async () => {
        const isValid = validateInput()
        try {

            if (isValid) {
                const res = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)


                if (res?.user) {

                    const itemToSave = {
                        email: res.user.email,
                        id: res.user?.uid
                    }

                    await set(ref(db, `/users/${res.user.uid}`), itemToSave);
                    authDispatch({ type: 'INITIALIZE_STATE', payload: itemToSave })
                    router.push('/login')
                }

            }



        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="grid border  min-h-screen place-items-center">
            <div className='max-w-[476px] m-auto '>
                <div className=" mb-[51px]">
                    <Image src='/pics/logo.png' className='m-8 md:m-auto ' width={182.5} height={40} alt='' />
                </div>
                <div className="p-8 md:p-10 md:bg-white rounded-xl">
                    <div className="">
                        <h2 className='font-bold text-[32px] text-custom_dark mb-2'>Create account</h2>
                        <p className='text-custom_deep_gray mb-10 '>Lets get you started sharing your links!</p>
                    </div>
                    <div className="grid gap-6">
                        <div className="">
                            <span className='text-custom_dark mb-1'>Email address</span>
                            <div className="flex items-center gap-[13.5px] py-3 px-4 border border-custom_light_gray rounded-xl">

                                <Mail fill='#737373' width={16} height={16} color='white' />
                                <input value={formValues.email} onChange={(e) => setFormValues(p => ({ ...p, email: e.target.value }))} type="email" name='email' placeholder='e.g alex@gmail.com' className='outline-none' />
                            </div>
                        </div>
                        <div className="">
                            <span className='text-custom_dark mb-1'>Create Password</span>
                            <div className="flex items-center gap-[13.5px] py-3 px-4 border border-custom_light_gray rounded-xl">
                                <Lock fill='#737373' width={16} height={16} color='#737373' />
                                <input value={formValues.password} onChange={(e) => setFormValues(p => ({ ...p, password: e.target.value }))} type="password" name='password' placeholder='Enter your password' className='outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className="">
                            <span className='text-custom_dark mb-1'>Confirm Password</span>
                            <div className="flex items-center gap-[13.5px] py-3 px-4 border border-custom_light_gray rounded-xl">
                                <Lock fill='#737373' width={16} height={16} color='#737373' />
                                <input value={formValues.confirmPassword} onChange={(e) => setFormValues(p => ({ ...p, confirmPassword: e.target.value }))} type="password" name='currectPassword' placeholder='Enter your password' className='outline-none bg-transparent' />
                            </div>
                        </div>
                    </div>
                    {errormsg && <p className='mt-6 text-custom_deep_gray text-[12px]'>{errormsg}</p>}
                    <div className="text-center my-6">
                        <button onClick={handleSubmit} className='p-[11px] bg-custom_blue w-full rounded-xl text-white font-semibold'>Create new account</button>
                    </div>
                    <p className=' text-center'>Already have an account? <br className='block md:hidden' /><Link href='/' className='text-custom_blue'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Page