'use client'
import { ChevronDown, Equal, Facebook, Github, Linkedin, Link as LinkIcon, Twitter } from "lucide-react"
import { ReactNode, useState } from "react"

// import { db } from '@/components/firebaseConfig'
// import { ref, set } from "firebase/database";
// import { uid } from "uid";
import { useLink } from "@/context/LinkContext";


type linkDataTypes = {
    name: string,
    link?: string,
    id: string,
    icon: ReactNode
}
const LinkCard = ({ name, link, icon, id }: linkDataTypes) => {

    const { state, dispatch } = useLink()

    const [isOpened, setIsopened] = useState(false)
    const [initialOpen, setInitialOpen] = useState(false)


    // write to database
    // const writeToDb = async () => {
    //     const uuid = uid()
    //     const getIt = await set(ref(db, `/${uuid}`), {
    //         id: uuid,
    //         name: 'frank',
    //         age: 45,
    //         pics: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'

    //     })
    //     console.log(getIt);

    // }




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
                            <p className="flex items-center gap-[14.13px] text-custom_dark">{icon} {name}</p>

                            <span><ChevronDown color="#633CFF" /></span>
                        </div>
                        <ul tabIndex={0} className={`dropdown-content w-full menu bg-base-100 rounded-box z-[1]  p-2 shadow ${isOpened ? 'hidden' : ''}`}>
                            {
                                linkData.map((data: linkDataTypes, i: number) => {
                                    return (
                                        // <li key={i} onClick={() => { setOption(p => ({ ...p, name: data.name, icon: data.icon })); setIsopened(p => !p); }}>
                                        <li key={i} onClick={(e) => { dispatch({ type: "UPDATE_ICON_AND_NAME", payload: { name: data.name, icon: data.icon, id } }); setIsopened(p => !p); }}>
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
                            <input type="text" className="w-9/12 outline-transparent" placeholder="e.g. https://www.github.com/benwright" onChange={(e) => dispatch({ type: "UPDATE_LINK", payload: { value: e.target.value, id } })} />
                            {!link && <span className=" hidden sm:inline text-[12px] text-custom_red ms-auto">Can't be empty</span>}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default LinkCard