'use client'
import { auth } from '@/components/firebaseConfig';
import Navbar from '@/components/Navbar';
import PhoneMockup from '@/components/PhoneMockup';
import { useAuthLink } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = ({ children }: { children: ReactNode }) => {
    const [user, loading] = useAuthState(auth)
    const [isClient, setIsClient] = useState(false);
    const { authState } = useAuthLink()

    const router = useRouter()
    useEffect(() => {

        setIsClient(true);
        if (user) {

        } else if (!user) {
            router.push("/login");
        }
    }, [authState.profile]);

    if (!isClient || loading) {
        return <div className='w-full h-screen grid place-items-center'><Image className='animate-spin' src='/pics/small-logo.png' width={40} height={40} alt='' /></div>;
    }

    return (
        <div className='container max-w-[1440px] m-auto  '>
            <Navbar />
            <div className=" lg:flex gap-6 m-4 md:m-6 ">
                <div className="flex-1 max-w-[560px] hidden lg:grid py-[101.5px]  place-items-center  bg-white rounded-[12px]">

                    <PhoneMockup />
                </div>
                <div className=" flex-1  bg-white rounded-[12px]">
                    {children}
                </div>
            </div>
        </div>

    )
};

export default Layout;