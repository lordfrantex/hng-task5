'use client'
import Image from "next/image"
import SaveBtn from "./SaveBtn"
import { useLink } from "@/context/LinkContext"
import { LinkIcon } from "lucide-react"
const page = () => {
    const { state, dispatch } = useLink()
    return (
        <div>
            <div className=" p-10 ">
                <div className="">

                    <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
                    <p className="font-normal text-custom_deep_gray mb-10">Add your details to create a personal touch to your profile.</p>
                </div>
                <div className="flex flex-wrap items-center mb-6 bg-custom_offwhite rounded-xl p-5 justify-between">
                    <p>Profile picture</p>
                    <div className="flex flex-wrap items-center cursor-pointer gap-6">
                        <div className=" px-10 py-[60px] grid gap-2 bg-custom_light_blue2 rounded-xl text-center">
                            <Image alt="" src='/pics/ph_image.png' width={40} height={40} className="m-auto" />
                            <p className="text-custom_blue font-semibold">+ Upload Image</p>
                        </div>
                        <p className="text-[12px] text-custom_deep_gray max-w-[215px]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                    </div>

                </div>

                <div className="bg-custom_offwhite rounded-xl p-5 grid gap-3 ">
                    <div className="block sm:flex items-center justify-between ">
                        <span>First name <sup>*</sup></span>
                        <div className="flex md:w-3/4 border bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input onChange={(e) => dispatch({ type: "FIRST_NAME", payload: e.target.value })} value={state.userInfo.firstName} type="text" className="outline-transparent  bg-transparent" placeholder="e.g John" />
                            {!state.userInfo.firstName && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can't be empty</span>}

                        </div>
                    </div>

                    <div className="block sm:flex items-center justify-between ">
                        <span>Last name <sup>*</sup></span>
                        <div className=" flex border bg-white items-center md:w-3/4  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input onChange={(e) => dispatch({ type: "LAST_NAME", payload: e.target.value })} value={state.userInfo.lastName} type="text" className="outline-transparent bg-transparent " placeholder="e.g. Appleseed" />
                            {!state.userInfo.lastName && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can't be empty</span>}
                        </div>


                    </div>
                    <div className=" block sm:flex items-center justify-between ">
                        <span className="">Email</span>
                        <div className=" flex  border md:w-3/4 bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} value={state.userInfo.email} type="text" className="outline-transparent bg-transparent" placeholder="e.g email@example.com" />
                            {!state.userInfo.email && <span className="text-[12px] hidden sm:inline ms-auto text-custom_red">  Can't be empty</span>}


                        </div>
                    </div>

                </div>
            </div>
            <SaveBtn />
        </div>
    )
}

export default page