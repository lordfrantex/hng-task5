'use client'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth, db } from './firebaseConfig'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useAuthLink } from '@/context/AuthContext'
import { ref, set } from 'firebase/database'


const Login = () => {

    const { authDispatch } = useAuthLink()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })
    const [formError, setErrors] = useState('');

    const validateForm = () => {
        let newErrors = '';
        let isValid = true;

        if (!formValues.email && !formValues.password) {
            setErrors('Email and Password are required')
            alert('Email and Password are required')
            return false;

        }
        else if (!formValues.email) {
            setErrors('Email is required')
            alert('Email is required')

            return false;
        }

        else if (!formValues.password) {
            setErrors('Password is required')
            alert('Password is required')


            return false;
        } else if (formValues.password.length < 8) {
            setErrors("Password must be at least 8 characters long");
            alert('Password must be at least 8 characters long')

            return false;
        }
        return isValid;
    };

    const router = useRouter()
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (validateForm()) {

            try {
                // login

                const res = await signInWithEmailAndPassword(formValues.email, formValues.password);
                if (res?.user) {

                    const itemToSave = {
                        email: res.user.email,
                        id: res.user?.uid
                    }

                    // await set(ref(db, `/users/${res.user.uid}`), itemToSave);
                    // authDispatch({ type: 'INITIALIZE_STATE', payload: itemToSave })
                    router.push('/editor')
                }

            } catch (err) {
                console.log(err);


            }
        }
    };




    return (
        <div className="grid h-screen place-items-center">
            <div className='max-w-[476px] m-auto '>
                <div className=" mb-[51px]">
                    <Image src='/pics/logo.png' className='m-8 md:m-auto ' width={182.5} height={40} alt='' />
                </div>
                <div className="p-8 md:p-10 md:bg-white rounded-xl">
                    <div className="">
                        <h2 className='font-bold text-[32px] text-custom_dark mb-2'>Login</h2>
                        <p className='text-custom_deep_gray mb-10 '>Add your details below to get into the app</p>
                    </div>
                    <div className="">
                        <div className="">
                            <span className='text-custom_dark mb-1'>Email address</span>
                            <div tabIndex={0} className="flex items-center group focus:shadow-custom-shadow gap-[13.5px] py-3 px-4 border border-custom_light_gray rounded-xl">

                                <Mail fill='#737373' width={16} height={16} color='white' />
                                <input required name='email' value={formValues.email} onChange={(e) => setFormValues(p => ({ ...p, email: e.target.value }))} type="text" placeholder='e.g alex@gmail.com' className='outline-none border-none bg-transparent focus:shadow-none' />
                            </div>
                        </div>
                        <div className="my-6">
                            <span className='text-custom_dark mb-1'>Password</span>
                            <div className="flex items-center gap-[13.5px] py-3 px-4 border border-custom_light_gray rounded-xl">
                                <Lock fill='#737373' width={16} height={16} color='#737373' />
                                <input required name='password' value={formValues.password} onChange={(e) => setFormValues(p => ({ ...p, password: e.target.value }))} type="password" placeholder='Enter your password' className='outline-none bg-transparent' />
                            </div>
                        </div>
                    </div>
                    {error && error.code}
                    <div className="text-center">
                        <button onClick={handleSubmit} className='p-[11px] bg-custom_blue w-full rounded-xl text-white font-semibold'>{loading ? "Logging in..." : 'Login'}</button>
                    </div>
                    <p className='mt-6 text-center'>Dont have an account? <br className='block md:hidden' /><Link href='/register' className='text-custom_blue'>Create account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login