'use client'
import { CircleUserRound, EyeIcon, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    return (
        <header className="bg-custom_offwhite">
            <div className="container max-w-[1440px] m-auto md:p-6">
                <div className="  m-auto flex justify-between px-6 py-4 bg-white  rounded-xl">

                    <Link href='/' className="flex items-center">
                        <Image src='/pics/logo.png' className="sm:block hidden" width={146} height={32} alt="Logo" />
                        <Image src='/pics/small-logo.png' className="block sm:hidden" width={32} height={32} alt="Logo" />
                    </Link>
                    <ul className="flex items-center md:gap-4 font-semibold text-[16px]">
                        <li>
                            <Link href="/editor" className={` flex items-center gap-2 py-[13px] px-[27px] cursor-pointer  rounded-[12px] ${pathname === '/editor' ? 'bg-custom_light_blue2 text-custom_blue' : ''}`}>
                                <LinkIcon height={20} width={20} />
                                <span className="hidden sm:block">Links</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/editor/profileDetails" className={`flex items-center gap-2 py-[13px] px-[27px] md:py-[11px]  md:px-[16px] cursor-pointer  rounded-[12px] ${pathname === '/editor/profileDetails' ? 'bg-custom_light_blue2 text-custom_blue' : ''}`}>
                                <CircleUserRound height={20} width={20} />
                                <span className="hidden sm:block">Profile Details</span>
                            </Link>
                        </li>

                    </ul>

                    <Link href='/preview' className="px-[16px] md:px-[27px] py-[11px] bg-white border text-custom_blue border-custom_blue rounded-lg font-semibold"><span className="sm:block hidden">Preview </span><span className="block sm:hidden "><EyeIcon height={20} width={20} /></span></Link>
                </div>
            </div>

        </header>
    )
}

export default Navbar