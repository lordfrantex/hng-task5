// "use client";
// import React, { useState, useEffect } from "react";
// // import Logo from "../../components/Logo";
// // import Envelop from "../../components/Envelop";
// // import LockIcon from "../../components/LockIcon";
// import Image from "next/image";
// import { Lock, Mail } from "lucide-react";
// import { auth } from '@/components/firebaseConfig'
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";

// const Login = () => {
//     const router = useRouter()

//     const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
//     const [formValues, setFormValues] = useState({
//         email: "",
//         password: "",
//     });
//     const [errors, setErrors] = useState({
//         email: "",
//         password: "",
//     });

//     const validateForm = () => {
//         const newErrors = { email: "", password: "" };
//         let isValid = true;

//         if (!formValues.email) {
//             newErrors.email = "Email is required";
//             isValid = false;
//         }
//         if (!formValues.password) {
//             newErrors.password = "Password is required";
//             isValid = false;
//         } else if (formValues.password.length < 8) {
//             newErrors.password = "Password must be at least 8 characters long";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormValues((prevValues) => ({ ...prevValues, [name]: value }));




//     };


//     const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 // const res = await createUserWithEmailAndPassword(formValues.email, formValues.password)
//                 // console.log(res);
//                 router.push('/editor')

//             } catch (err) {
//                 console.log(err);

//             }
//         }
//     };



//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//             <div className="relative w-full max-w-md p-8 pt-12 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
//                     {/* <Logo /> */}
//                     <Image src='/pics/logo.png' alt="" width={182.5} height={40} />
//                 </div>
//                 <form className="space-y-4" >
//                     <h2 className="text-2xl font-bold text-left mt-[-50px]">Login</h2>
//                     <p className="text-left text-gray-600 whitespace-nowrap">
//                         Add your details below to get you back into the app.
//                     </p>

//                     <div className="relative">
//                         <label
//                             htmlFor="email"
//                             className="block text-sm font-medium text-gray-700"
//                         >
//                             Email address
//                         </label>
//                         <div className="relative mt-1">
//                             {/* <Envelop /> */}
//                             <Mail width={20} height={20} />

//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 required
//                                 value={formValues.email}
//                                 onChange={handleChange}
//                                 className={`w-full h-12 px-4 py-3 border bg-transparent rounded-lg pl-10 ${errors.email ? "border-red-500" : "border-gray-300"} `}
//                                 placeholder="e.g. alex@example.com"
//                             />
//                             {errors.email && (
//                                 <p className="absolute right-4 top-1/2 transform -translate-y-1 text-red-500 text-sm">
//                                     {errors.email}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     <div className="relative">
//                         <label
//                             htmlFor="password"
//                             className="block text-sm font-medium text-gray-700"
//                         >
//                             Password
//                         </label>
//                         <div className="relative mt-1">
//                             {/* <LockIcon /> */}
//                             <Lock width={20} height={20} />
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 required
//                                 value={formValues.password}
//                                 onChange={handleChange}
//                                 className={`w-full h-12 px-4 py-3 border rounded-lg pl-10 ${errors.password ? "border-red-500" : "border-gray-300"
//                                     } `}
//                                 placeholder="Enter your password"
//                             />
//                             {errors.password && (
//                                 <p className="absolute right-4 top-1/2 transform -translate-y-1 text-red-500 text-sm">
//                                     {errors.password}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         className={`w-full h-11 px-6 py-2.5 rounded-lg  bg-purple-600
//                             text-white`}
//                         onClick={handleSubmit}
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                     Don&apos;t have an account?{" "}
//                     <a href="/" className="text-blue-600 underline">
//                         Create account
//                     </a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;



'use client'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const Login = () => {

    const router = useRouter()

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = () => {
        router.push('/editor')
    }



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
                    <div className="text-center">
                        <button onClick={handleSubmit} className='p-[11px] bg-custom_blue w-full rounded-xl text-white font-semibold'>Login</button>
                    </div>
                    <p className='mt-6 text-center'>Dont have an account? <br className='block md:hidden' /><Link href='/register' className='text-custom_blue'>Create account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login