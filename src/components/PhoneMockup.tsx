import Image from "next/image"

const PhoneMockup = () => {
    return (
        <div>
            <div className=" border-custom_deep_gray border py-[43.5px] px-[34.5px] rounded-[50px]">
                <div className="mb-[56px]  ">
                    {/* <Image alt="" src='/pics/Subtract.png' width={307} height={631} className="" /> */}
                    <div className="circle w-[96px] h-[96px] mb-[25px] rounded-full bg-custom_light_red m-auto"></div>
                    <p className="w-[160px] h-4 rounded-full  bg-custom_light_red mb-[13px] m-auto"></p>
                    <p className=" w-[72px] h-2 rounded-full  bg-custom_light_red m-auto"></p>
                </div>
                <div className="grid gap-5">
                    <button className="h-[44px] bg-custom_light_red rounded-lg w-[237px] block"></button>
                    <button className="h-[44px] bg-custom_light_red rounded-lg w-[237px] block"></button>
                    <button className="h-[44px] bg-custom_light_red rounded-lg w-[237px] block"></button>
                    <button className="h-[44px] bg-custom_light_red rounded-lg w-[237px] block"></button>
                    <button className="h-[44px] bg-custom_light_red rounded-lg w-[237px] block"></button>

                </div>
            </div>
        </div>
    )
}

export default PhoneMockup