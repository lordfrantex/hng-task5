'use client'
import { ChevronDown, Equal, Facebook, Github, Linkedin, Link as LinkIcon, Twitter } from "lucide-react"
import { ReactNode, useState } from "react"

import { useLink } from "@/context/LinkContext";
import Icon from "./Icon";


type linkDataTypes = {
    name: string,
    link?: string,
    id: string,
    // icon: ReactNode
    icon: string
}
const LinkCard = ({ name, link, icon, id }: linkDataTypes) => {

    const { state, dispatch } = useLink()

    const [isOpened, setIsopened] = useState(false)
    const [initialOpen, setInitialOpen] = useState(false)


    type linkDataTypes = {
        name: string,
        link?: string,
        // icon: ReactNode
        icon: string
    }

    const icons = {
        github: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdGh1YiI+PHBhdGggZD0iTTE1IDIydi00YTQuOCA0LjggMCAwIDAtMS0zLjVjMyAwIDYtMiA2LTUuNS4wOC0xLjI1LS4yNy0yLjQ4LTEtMy41LjI4LTEuMTUuMjgtMi4zNSAwLTMuNSAwIDAtMSAwLTMgMS41LTIuNjQtLjUtNS4zNi0uNS04IDBDNiAyIDUgMiA1IDJjLS4zIDEuMTUtLjMgMi4zNSAwIDMuNUE1LjQwMyA1LjQwMyAwIDAgMCA0IDljMCAzLjUgMyA1LjUgNiA1LjUtLjM5LjQ5LS42OCAxLjA1LS44NSAxLjY1LS4xNy42LS4yMiAxLjIzLS4xNSAxLjg1djQiLz48cGF0aCBkPSJNOSAxOGMtNC41MSAyLTUtMi03LTIiLz48L3N2Zz4=',
        linkden: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxpbmtlZGluIj48cGF0aCBkPSJNMTYgOGE2IDYgMCAwIDEgNiA2djdoLTR2LTdhMiAyIDAgMCAwLTItMiAyIDIgMCAwIDAtMiAydjdoLTR2LTdhNiA2IDAgMCAxIDYtNnoiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgeD0iMiIgeT0iOSIvPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIi8+PC9zdmc+'
    }

    const linkData: linkDataTypes[] = [
        {
            name: 'Github',
            icon: icons.github

        },
        // {
        //     name: 'Facebook',
        //     icon: <Facebook width={16} height={16} />

        // },
        {
            name: 'Linkedin',
            icon: icons.linkden

        },
        // {
        //     name: 'Twitter',
        //     icon: <Twitter width={16} height={16} />

        // },

    ]
    return (
        <div>
            <div className="bg-custom_offwhite p-5 mb-6  rounded-xl">
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
                            {/* <p className="flex items-center gap-[14.13px] text-custom_dark">{icon} {name}</p> */}
                            <p className="flex items-center gap-[14.13px] text-custom_dark"><Icon src={icon} /> {name}</p>

                            <span><ChevronDown color="#633CFF" /></span>
                        </div>
                        <ul tabIndex={0} className={`dropdown-content w-full menu bg-base-100 rounded-box z-[1]  p-2 shadow ${isOpened ? 'hidden' : ''}`}>
                            {
                                linkData.map((data: linkDataTypes, i: number) => {
                                    return (
                                        <li key={i} onClick={(e) => { dispatch({ type: "UPDATE_ICON_AND_NAME", payload: { name: data.name, icon: data.icon, id } }); setIsopened(p => !p); }}>
                                            <div>
                                                <span className="text-custom_deep_gray"><Icon src={data.icon} /> </span>{data.name}
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
                            <input type="text" className="w-9/12 outline-transparent" value={link} placeholder="e.g. https://www.github.com/benwright" onChange={(e) => dispatch({ type: "UPDATE_LINK", payload: { value: e.target.value, id } })} />
                            {!link && <span className=" hidden sm:inline text-[12px] text-custom_red ms-auto">Can&apos;t be empty</span>}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default LinkCard