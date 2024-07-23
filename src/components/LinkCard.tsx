'use client'
import { ChevronDown, Equal, Facebook, Github, Linkedin, Link as LinkIcon, Twitter } from "lucide-react"
import React, { ReactNode, useState } from "react"

type linkDataTypes = {
    name: string,
    link?: string,
    icon: ReactNode
}
const LinkCard = ({ name, link, icon }: linkDataTypes) => {
    // collect platform and link as props



    const [inputLink, setInputLink] = useState(link)
    const [isOpened, setIsopened] = useState(false)
    const [initialOpen, setInitialOpen] = useState(false)
    const [inputOption, setOption] = useState<linkDataTypes>({
        name, link, icon
    })


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLink(event.target.value);
    };

    type linkDataTypes = {
        name: string,
        link?: string,
        icon: ReactNode
    }
    const linkData: linkDataTypes[] = [
        {
            name: 'Github',
            icon: <Github width={16} height={16} fill="#737373" />

        },
        {
            name: 'Facebook',
            icon: <Facebook width={16} height={16} />

        },
        {
            name: 'Linkedin',
            icon: <Linkedin width={16} height={16} />

        },
        {
            name: 'Twitter',
            icon: <Twitter width={16} height={16} />

        },

    ]
    return (
        <div>
            {name}{link}
            <div className="bg-custom_offwhite p-5  rounded-xl">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-custom_deep_gray font-bold">
                        <Equal />
                        <span>Link #1</span>
                    </div>
                    <span className="cursor-pointer text-[#888888]" >Remove</span>
                </div>
                <div className="">

                    <p className="text-custom_dark text-[12px] mb-1">Platform</p>
                    <div className="dropdown w-full ">
                        <div tabIndex={0} onClick={() => { setInitialOpen(true); initialOpen && setIsopened(p => !p) }} role="button" className="rounded-lg m-1 w-full p-4 flex justify-between border border-custom_light_gray bg-white hover:shadow-custom-shadow hover:border-custom_blue">
                            <p className="flex items-center gap-[14.13px] text-custom_dark">{inputOption?.icon} {inputOption?.name}</p>

                            <span><ChevronDown color="#633CFF" /></span>
                        </div>
                        <ul tabIndex={0} className={`dropdown-content w-full menu bg-base-100 rounded-box z-[1]  p-2 shadow ${isOpened ? 'hidden' : ''}`}>
                            {
                                linkData.map((data: linkDataTypes, i: number) => {
                                    return (
                                        <li key={i} onClick={() => { setOption(data); setIsopened(p => !p); }}>
                                            <div>
                                                <span className="text-custom_deep_gray">{data.icon}</span>{data.name}
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
                    <div className=" w-full">
                        <div className=" w-full rounded-lg p-4 flex items-center gap-3  border border-custom_light_gray bg-white hover:shadow-custom-shadow hover:border-custom_blue">
                            <p className="flex items-center gap-[14.13px] text-custom_dark"><LinkIcon color="#737373" height={16} width={16} /></p>
                            <input type="text" className="w-9/12 outline-transparent" placeholder="e.g. https://www.github.com/benwright" onChange={handleChange} />
                            {!inputLink && <span className="text-[12px] text-custom_red ms-auto">Can't be empty</span>}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default LinkCard