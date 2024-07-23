'use client'
import { CircleUserRound, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    return (
        <header className="bg-custom_offwhite">
            <div className="container max-w-[1440px] m-auto p-6">
                <div className="  m-auto flex justify-between px-6 py-4 bg-white  rounded-xl">

                    <div className="logo flex items-center">
                        <Image src='/pics/logo.png' width={146} height={32} alt="Logo" />
                    </div>
                    <ul className="flex items-center gap-4 font-semibold text-[16px]">
                        <li>
                            <Link href="/editor" className={`flex items-center gap-2 py-[13px] px-[27px] cursor-pointer  rounded-[12px] ${pathname === '/editor' ? 'bg-custom_light_blue2 text-custom_blue' : ''}`}>
                                <LinkIcon height={20} width={20} />
                                <span>Links</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/editor/profileDetails" className={`flex items-center gap-2 py-[13px] px-[27px] cursor-pointer  rounded-[12px] ${pathname === '/editor/profileDetails' ? 'bg-custom_light_blue2 text-custom_blue' : ''}`}>
                                <CircleUserRound height={20} width={20} />
                                <span>Profile Details</span>
                            </Link>
                        </li>

                    </ul>

                    <button className="px-[27px] py-[11px] bg-white border border-custom_blue rounded-lg font-semibold">Preview</button>
                </div>
            </div>

        </header>
    )
}

export default Navbar