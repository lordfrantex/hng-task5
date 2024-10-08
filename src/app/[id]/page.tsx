'use client'
import { determineColor } from '@/components/determineColor';
import { auth, db } from '@/components/firebaseConfig';
import LinkList from '@/components/LinkList';
import { useAuthLink } from '@/context/AuthContext';
import { useLink } from '@/context/LinkContext';
import { get, ref } from 'firebase/database';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the type for links
type LinkType = {
    name: string;
    link: string;
    id: string;
    order?: number; // Adding order property if it exists
};

type UserState = {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    url: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const [user] = useAuthState(auth);
    const [fetchLinks, setFetchLinks] = useState<LinkType[]>([]);
    const [fetchUser, setFetchUser] = useState<UserState | undefined>(undefined);

    const fetchInitialData = async (id: string) => {
        try {
            const dbRef = ref(db, `/items/${id}`);
            const snapshot = await get(dbRef);
            const data = snapshot.val();

            if (data) {
                const payload = Object.values(data) as LinkType[];
                const sortedLinks = payload.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
                setFetchLinks(sortedLinks);
                return sortedLinks;
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    const fetchInitialUser = async (id: string) => {
        try {
            const dbRef = ref(db, `/users/${id}`);
            const snapshot = await get(dbRef);
            const data = snapshot.val();
            if (data) {
                setFetchUser(data);
                return data;
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        fetchInitialData(params.id);
        fetchInitialUser(params.id);
    }, [params.id]);

    const mapLinks = fetchLinks.map((link: LinkType) => {
        const color = determineColor(link.name);
        return (
            <div className="mb-4" key={link.id}>
                <Link href={`${link.link}`} target='_blank' style={{ backgroundColor: color }} className="flex cursor-pointer text-white rounded-xl justify-between items-center px-4 py-[18px]">
                    <span className="flex items-center gap-2">
                        {link.name}
                        <LinkList {...link} color='white' />
                    </span>
                    <ArrowRight width={16} height={16} color="white" />
                </Link>
            </div>
        );
    });

    const handleCopy = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="relative z-50">
            <ToastContainer />
            <span className='hidden sm:block w-full h-[357px] -z-10 absolute bg-custom_blue rounded-b-[32px] left-0 top-0'></span>
            <div className="rounded-b-[32px] p-6">
                <div className="py-4 sm:px-6 sm:bg-white flex justify-between gap-4 items-center rounded-xl mb-[102px]">
                    {/* {fetchUser && (
                        <Link href='/editor' className='rounded-lg text-custom_blue border border-custom_blue py-3 font-semibold px-7 whitespace-nowrap'>
                            Back to Editor
                        </Link>
                    )} */}
                    <button onClick={handleCopy} className='bg-custom_blue ms-auto text-white rounded-lg py-3 px-7 font-semibold whitespace-nowrap'>
                        Share Link
                    </button>
                </div>
                <div className="md:w-[349px] py-12 px-3 md:px-14 m-auto rounded-3xl md:bg-white z-10">
                    <div className="grid place-items-center mb-14">
                        {fetchUser?.url && (
                            <Image src={fetchUser.url} width={104} height={104} className="h-[104px] w-[104px] border-[4px] rounded-full border-custom_blue mb-6" alt="" />
                        )}
                        {fetchUser?.firstName ? (
                            <h3 className="font-bold text-custom_dark text-[28px] mb-2">
                                {fetchUser.firstName} {fetchUser.lastName}
                            </h3>
                        ) : (
                            <p className='w-[200px] h-3 animate-pulse rounded-lg bg-custom_light_gray'></p>
                        )}
                        {fetchUser?.email ? (
                            <p>{fetchUser.email}</p>
                        ) : (
                            <p className='w-[100px] mt-3 animate-pulse h-3 rounded-lg bg-custom_light_gray'></p>
                        )}
                    </div>
                    <div className="h-[300px] overflow-auto scrollbar-thin scrollbar-track-current">
                        {fetchLinks.length > 0 ? mapLinks : (
                            <div className="grid place-items-center gap-3 animate-pulse">
                                <p>No Link to show</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
