import Navbar from '@/components/Navbar';
import PhoneMockup from '@/components/PhoneMockup';
import React, { ReactNode } from 'react';


const Layout = ({ children }: { children: ReactNode }) => {
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