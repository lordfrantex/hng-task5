'use client'
import {
    ChevronDown, Equal, Facebook, Github, Linkedin, Link as LinkIcon, Twitter, Youtube,
    Codepen,
    Gitlab,
} from "lucide-react"
import { FaFreeCodeCamp, FaStackOverflow, } from "react-icons/fa";
import { BiLogoDevTo } from "react-icons/bi";
import { FaHashnode, FaTwitch } from "react-icons/fa6";
import { SiCodewars, SiFrontendmentor } from "react-icons/si";
import { Dispatch, ReactElement, SetStateAction, useState } from "react"
import { useLink } from "@/context/LinkContext";
import { LinkType } from "@/app/editor/page";
import { useAuthLink } from "@/context/AuthContext";
import LinkList from "./LinkList";
import { toast } from "react-toastify";
type linkCardTypes = {
    name: string;
    link: string;
    id: string;
    i: number;
    setCopyLink: Dispatch<SetStateAction<LinkType[]>>
    copyLink: LinkType[]

}


export type linkDataTypes = {
    name: string;
    link?: string;
    icon: ReactElement;
}
export const linkData: linkDataTypes[] = [
    {
        name: 'Github',
        icon: <Github width={16} height={16} />
    },
    {
        name: 'Linkedin',
        icon: <Linkedin width={16} height={16} />
    },
    {
        name: 'Youtube',
        icon: <Youtube width={16} height={16} />
    },
    {
        name: 'Frontend Mentor',
        icon: <SiFrontendmentor width={16} height={16} />
    },
    {
        name: 'Twitter',
        icon: <Twitter width={16} height={16} />
    },
    {
        name: 'Facebook',
        icon: <Facebook width={16} height={16} />
    },
    {
        name: 'Twitch',
        icon: <FaTwitch width={16} height={16} />
    },
    {
        name: 'Dev.to',
        icon: <BiLogoDevTo width={16} height={16} />
    },
    {
        name: 'Codewars',
        icon: <SiCodewars width={16} height={16} />
    },
    {
        name: 'Codepen',
        icon: <Codepen width={16} height={16} />
    },
    {
        name: 'freeCodeCamp',
        icon: <FaFreeCodeCamp width={16} height={16} />
    },
    {
        name: 'GitLab',
        icon: <Gitlab width={16} height={16} />
    },
    {
        name: 'Hashnode',
        icon: <FaHashnode width={16} height={16} />
    },
    {
        name: 'Stack Overflow',
        icon: <FaStackOverflow width={16} height={16} />
    }
];


const LinkCard = ({ name, link, id, i, setCopyLink, copyLink }: linkCardTypes) => {
    const passState = { name, link, id, }
    const { authState } = useAuthLink()
    const [selectErr, setSelectErr] = useState('')

    const { fetchInitialData, state, removeLink: removeLinkFunc } = useLink()

    const [isOpened, setIsopened] = useState(false)
    const [initialOpen, setInitialOpen] = useState(false)

    const removeLink = async () => {
        try {
            removeLinkFunc(authState.profile.id, id)
            fetchInitialData(authState.profile.id)
            toast("Item deleted successfully")

        } catch (error) {
            console.log(error);
        }
    }
    const handleSelect = (name: string) => {
        if (copyLink.some(itm => itm.name === name)) {
            setSelectErr(` ${name} account already exist. You are only permitted to have just one.`);
            setTimeout(() => setSelectErr(''), 2500);
            return
        }

        setCopyLink(prev => prev.map(link => link.id === id ? { ...link, name: name } : link))

    }

    return (
        <div >
            <div className="bg-custom_offwhite p-5 mb-10 md:mb-6  rounded-xl cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-custom_deep_gray font-bold">
                        <Equal />
                        <span>Link #{i + 1}</span>

                    </div>
                    <span onClick={removeLink} className="cursor-pointer text-[#888888]" >Remove</span>
                </div>
                <div className="">

                    <p className="text-custom_dark text-[12px] mb-1">Platform</p>
                    {selectErr && <span className="text-sm text-custom_red font-semibold">{selectErr}</span>}
                    <div className="dropdown w-full ">
                        <div tabIndex={0} onClick={() => { setInitialOpen(true); initialOpen && setIsopened(p => !p) }} role="button" className="rounded-lg m-1 w-full p-4 flex justify-between border border-custom_light_gray bg-white hover:shadow-custom-shadow hover:border-custom_blue">
                            <p className="flex items-center gap-[14.13px] text-custom_dark"><LinkList {...passState} color='#333333' />{name}</p>
                            <span><ChevronDown color="#633CFF" /></span>
                        </div>
                        <ul tabIndex={0} className={`dropdown-content max-h-[200px] overflow-auto w-full menu bg-base-100 rounded-box z-[1]  p-2 shadow ${isOpened ? 'hidden' : ''}`}>
                            {
                                linkData.map((data: linkDataTypes, i: number) => {
                                    return (
                                        <li key={i} onClick={(e) => { handleSelect(data.name); setIsopened(p => !p); }}>
                                            <div>
                                                <span className="text-custom_deep_gray"><LinkList link={data.link} name={data.name} /> </span>{data.name}
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>

                <div className="">
                    <p className="text-custom_dark text-[12px] mb-1">Link</p>
                    <div className=" w-full relative">
                        <input type="text" className="ps-14 w-full rounded-lg p-4 
                         border border-custom_light_gray bg-white hover:shadow-custom-shadow focus:shadow-custom-shadow
                           outline-custom_blue hover:border-custom_blue"
                            placeholder="e.g. https://www.github.com/benwright" value={link}
                            onChange={(e) => setCopyLink(prev => prev.map(link => link.id === id ? { ...link, link: e.target.value } : link))} />
                        <span className=" absolute top-1/2 -translate-y-1/2 left-5  text-custom_dark"><LinkIcon color="#737373" height={16} width={16} /></span>
                        {!link && <span className=" hidden absolute -translate-y-1/2 top-1/2 right-4 sm:inline text-[12px] text-custom_red ms-auto">Can&apos;t be empty</span>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LinkCard