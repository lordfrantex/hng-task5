'use client'
import { auth, db } from '@/components/firebaseConfig';
import LinkList from '@/components/LinkList';
import { useAuthLink } from '@/context/AuthContext';
import { useLink } from '@/context/LinkContext';
import { get, ref } from 'firebase/database';
import { ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Define the type for links
type LinkType = {
    name: string;
    link: string;
    id: string;
};
export const determineColor = (name: string) => {
    let color = ''

    switch (true) {
        case name.toLocaleLowerCase().includes('facebook'):
            color = '#1877F2';
            break;
        case name.toLocaleLowerCase().includes('github'):
            color = '#171515';
            break;
        case name.toLocaleLowerCase().includes('twitter'):
            color = '#1DA1F2';
            break;
        case name.toLocaleLowerCase().includes('instagram'):
            color = '#E1306C';
            break;
        case name.toLocaleLowerCase().includes('linkedin'):
            color = '#0A66C2';
            break;
        case name.toLocaleLowerCase().includes('pinterest'):
            color = '#E60023';
            break;
        case name.toLocaleLowerCase().includes('snapchat'):
            color = '#FFFC00';
            break;
        case name.toLocaleLowerCase().includes('tiktok'):
            color = '#010101';
            break;
        case name.toLocaleLowerCase().includes('youtube'):
            color = '#FF0000';
            break;
        case name.toLocaleLowerCase().includes('whatsapp'):
            color = '#25D366';
            break;
        case name.toLocaleLowerCase().includes('reddit'):
            color = '#FF4500';
            break;
        case name.toLocaleLowerCase().includes('dev.to'):
            color = '#0A0A0A';
            break;
        case name.toLocaleLowerCase().includes('twitch'):
            color = '#9146FF';
            break;
        case name.toLocaleLowerCase().includes('stack overflow'):
            color = '#F58025';
            break;
        case name.toLocaleLowerCase().includes('codewars'):
            color = '#AD2C27';
            break;
        case name.toLocaleLowerCase().includes('hashnode'):
            color = '#2962FF';
            break;
        case name.toLocaleLowerCase().includes('codepen'):
            color = '#000000';
            break;
        case name.toLocaleLowerCase().includes('frontend mentor'):
            color = '#3F54A3';
            break;
        case name.toLocaleLowerCase().includes('gitlab'):
            color = '#FC6D26';
            break;
        case name.toLocaleLowerCase().includes('freecodecamp'):
            color = '#006400';
            break;
        default:
            color = 'white';
            break;
    }
    return color
}

// Define the page component
const Page = () => {
    const [user] = useAuthState(auth)
    useEffect(() => {

        user?.uid && fetchInitialAuthData(user?.uid)
        user?.uid && fetchInitialData(user.uid)

    }, [user?.uid])
    const { state, fetchInitialData } = useLink()
    const { authState, fetchInitialAuthData } = useAuthLink()

    const mapIt = state.links.map(link => {
        return {
            ...link,
            color: determineColor(link.name)
        }
    })


    const mapLinks = (state.links && state.links.length > 0) && mapIt.map((link) => (
        <div className="mb-4" key={link.id}>
            <Link href={`${link.link}`} target='_blank' style={{ backgroundColor: link.color }} className="flex  cursor-pointer text-white rounded-xl justify-between items-center px-4 py-[18px]">
                <span className="flex items-center gap-2">
                    {link.name}
                    <LinkList{...link} key={link.id} color='white' />
                </span>
                <ArrowRight width={16} height={16} color="white" />
            </Link>
        </div>
    ));
    const handleCopy = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        // <div className="min-h-screen grid place-items-center relative ">
        <div className=" relative ">
            <div className="h-[357px] bg-custom_blue rounded-b-[32px] p-6">

                <div className=" py-4 px-6 bg-white flex justify-between items-center rounded-xl mb-[102px]">
                    {
                        user?.email === authState.profile.email && <Link href='/editor' className='rounded-lg text-custom_blue border border-custom_blue py-3 font-semibold px-7'>Back to Editor</Link>

                    }
                    <button onClick={handleCopy} className='bg-custom_blue ms-auto text-white rounded-lg py-3 px-7 font-semibold'>Share Link</button>

                </div>
                <div className="w-[349px] py-12 px-14 m-auto rounded-3xl md:bg-white z-10">
                    <div className="grid place-items-center mb-14">
                        <Image src={authState.profile.url} width={104} height={104} className="h-[104px] w-[104px] border-[4px] rounded-full border-custom_blue mb-6" alt="" />
                        {authState.profile.firstName ?
                            <h3 className="font-bold text-custom_dark text-[28px] mb-2">{authState.profile.firstName} {authState.profile.lastName}</h3>
                            : <p className='w-[200px] h-3 animate-pulse rounded-lg bg-custom_light_gray'></p>

                        }
                        {authState.profile.email ?
                            <p>{authState.profile.email}</p>
                            : <p className='w-[100px] mt-3 animate-pulse h-3 rounded-lg bg-custom_light_gray'></p>
                        }
                    </div>
                    <div className="">
                        {mapLinks ? mapLinks : (
                            <div className="grid place-items-center gap-3 animate-pulse">

                                <p>No Link to show</p>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;
