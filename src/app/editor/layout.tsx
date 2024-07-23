import PhoneMockup from '@/components/PhoneMockup';
import React, { ReactNode } from 'react';


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='container max-w-[1440px] m-auto  '>
            <div className=" lg:flex gap-6  m-6 ">
                <div className="flex-1 max-w-[560px] py-[101.5px]  place-items-center grid bg-white rounded-[12px]">

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