'use client'
import { ArrowRight, BarChart, Book, ChevronDown, CirclePlay, Monitor } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

const Page = () => {
    const [navActive, setNavActive] = useState({
        products: false,
        explore: false,
    });

    const dropdownRef = useRef(null);

    const handleNav = (nav) => {
        setNavActive(prev => ({
            products: false,
            explore: false,
            [nav]: !prev[nav]
        }));
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setNavActive({
                products: false,
                explore: false,
            });
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='max-w-[1440px] m-auto px-4  md:px-[100px] py-6' >
            <nav className="flex items-center gap-10">
                <Image alt='logo.' src='/hwai-pics/logo.png' height={32} width={179} />
                <div className="hidden md:flex flex-1">
                    <ul className=' items-center gap-8 cursor-pointer hidden md:flex' ref={dropdownRef}>
                        <li>Home </li>
                        <li className='relative'>
                            <Link className='flex items-center gap-2' onClick={() => handleNav('products')} href='#'>
                                Products <span><ChevronDown height={20} width={20} /></span>
                            </Link>
                            <ul className={`px-5 py-6 bg-white rounded-lg left-0 top-[50px] absolute w-[336px] ${navActive.products ? 'block' : 'hidden'}`}>
                                <div>
                                    <p className='mb-3 text-[#B5391E]'>Products</p>
                                    <div className="grid gap-2">
                                        <li className='p-3 flex gap-4'>
                                            <span>
                                                <BarChart color='#B5391E' width={24} height={24} />
                                            </span>
                                            <div>
                                                <h4 className='mb-1 text-[#101828]'>Parent Details</h4>
                                                <p className='mb-3 text-[#667085]'>Allows teacher grading and get questions.</p>
                                                <Link href='#' className='flex gap-2 items-center text-[#B5391E]'>Learn more<ArrowRight /></Link>
                                            </div>
                                        </li>
                                        <li className='p-3 flex gap-4'>
                                            <span>
                                                <Monitor color='#B5391E' width={24} height={24} />
                                            </span>
                                            <div>
                                                <h4 className='mb-1 text-[#101828]'>Parent Details</h4>
                                                <p className='mb-3 text-[#667085]'>Provide guidance for their children, and provide additional control.</p>
                                                <Link href='#' className='flex gap-2 items-center text-[#B5391E]'>Learn more<ArrowRight /></Link>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li className='relative'>
                            <Link className='flex items-center gap-2' onClick={() => handleNav('explore')} href='#'>
                                Explore <span><ChevronDown height={20} width={20} /></span>
                            </Link>
                            <ul className={`px-5 py-6 bg-white rounded-lg absolute top-[50px] left-0 w-[336px] ${navActive.explore ? 'block' : 'hidden'}`}>
                                <div>
                                    <p className='mb-3 text-[#B5391E]'>Explore</p>
                                    <div className="grid gap-2">
                                        <li className='p-3 flex gap-4'>
                                            <span>
                                                <Book color='#B5391E' width={24} height={24} />
                                            </span>
                                            <div>
                                                <h4 className='mb-1 text-[#101828]'>Blog</h4>
                                                <p className='mb-3 text-[#667085]'>The latest industry news, updates and info.</p>
                                            </div>
                                        </li>
                                        <li className='p-3 flex gap-4'>
                                            <span>
                                                <CirclePlay color='#B5391E' width={24} height={24} />
                                            </span>
                                            <div>
                                                <h4 className='mb-1 text-[#101828]'>Video tutorials</h4>
                                                <p className='mb-3 text-[#667085]'>Get up and running on new features and techniques.</p>
                                            </div>
                                        </li>
                                        <li className='p-3 flex gap-4'>
                                            <span>
                                                <Monitor color='#B5391E' width={24} height={24} />
                                            </span>
                                            <div>
                                                <h4 className='mb-1 text-[#101828]'>Customer stories</h4>
                                                <p className='mb-3 text-[#667085]'>Learn how our customers are making big changes.</p>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </li>
                    </ul>
                    <div className="flex ms-auto gap-[30px]">
                        <Link href="/" className='text-[#0F172A] text-sm rounded-md px-4 py-2'>Login</Link>
                        <Link href="/" className='bg-[#FF502A] text-sm text-white rounded-md px-4 py-2'>Get Started</Link>
                    </div>
                </div>
                <button className='md:hidden block'>Open</button>
            </nav>
        </header>
    );
};

export default Page;

