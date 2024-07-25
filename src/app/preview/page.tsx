import { ArrowRight, Github } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='min-h-screen grid place-items-center relative '>
            <span className='hidden md:block absolute top-0 left-0 w-full h-[357px] bg-custom_blue rounded-b-[32px] z-1'></span>
            <div className="w-[349px] py-12 px-14 m-auto rounded-3xl md:bg-white z-10">
                <div className="grid place-items-center mb-14">
                    <Image src='/pics/Ellipse 3.png' width={104} height={104} className='rounded-full border mb-6' alt='' />
                    <h3 className='font-bold text-custom_dark text-[32px]  mb-2'>Ben Write</h3>
                    <p className=''>ben@example.com</p>
                </div>
                <div className="grid gap-5">
                    <div className="flex text-white bg-custom_blue rounded-xl justify-between items-center px-4 py-[18px]">
                        <span className='flex items-center gap-2'>
                            Github
                            <Github width={20} height={20} color='white' fill='white' />
                        </span>

                        <ArrowRight width={16} height={16} color='white' />
                    </div>

                    <div className="flex text-white bg-custom_blue rounded-xl justify-between items-center px-4 py-[18px]">
                        <span className='flex items-center gap-2'>
                            Github
                            <Github width={20} height={20} color='white' fill='white' />
                        </span>

                        <ArrowRight width={16} height={16} color='white' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page