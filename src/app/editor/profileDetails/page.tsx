import Image from "next/image"

const page = () => {
    return (
        <div>
            <div className="p-10 ">
                <div className="">

                    <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
                    <p className="font-normal text-custom_deep_gray mb-10">Add your details to create a personal touch to your profile.</p>
                </div>
                <div className="flex items-center mb-6 bg-custom_offwhite rounded-xl p-5 justify-between">
                    <p>Profile picture</p>
                    <div className="flex items-center cursor-pointer gap-6">
                        <div className=" px-10 py-[60px] grid gap-2 bg-custom_light_blue2 rounded-xl text-center">
                            <Image alt="" src='/pics/ph_image.png' width={40} height={40} className="m-auto" />
                            <p className="text-custom_blue font-semibold">+ Upload Image</p>
                        </div>
                        <p className="text-[12px] text-custom_deep_gray max-w-[215px]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                    </div>

                </div>

                <div className="bg-custom_offwhite rounded-xl p-5 grid gap-3 ">
                    <div className="flex items-center justify-between ">
                        <span>First name <sup>*</sup></span>
                        <div className="flex border bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input type="text" className="outline-transparent bg-transparent" placeholder="e.g John" />
                            <span className="text-[12px] ms-auto text-custom_red">Can't be empty</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between ">
                        <span>Last name <sup>*</sup></span>
                        <div className=" flex border bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input type="text" className="outline-transparent bg-transparent" placeholder="e.g. Appleseed" />
                            <span className="text-[12px] ms-auto text-custom_red">Can't be empty</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                        <span>First name</span>
                        <div className=" flex border bg-white items-center  px-4 py-3 rounded-lg border-custom_light_gray  gap-[100px] hover:shadow-custom-shadow hover:border-custom_blue">
                            <input type="text" className="outline-transparent bg-transparent" placeholder="e.g email@example.com" />
                            <span className="text-[12px] ms-auto text-custom_red">Can't be empty</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex py-6 px-10 border-t">
                <button className="ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]">Save</button>
            </div>
        </div>
    )
}

export default page