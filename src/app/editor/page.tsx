'use client'
import LinkCard from "@/components/LinkCard";
import { useLink } from "@/context/LinkContext";
import Image from "next/image"


const Page = () => {
  const { dispatch, state } = useLink()

  const handleSubmit = () => {
    console.log(state.links);

  }


  return (
    <div>
      <div className=" p-6 md:p-10 ">
        <div className="">

          <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
          <p className="font-normal text-custom_deep_gray mb-10">Add/edit/remove links below and then share all your profiles with the world!</p>
          <button onClick={() => dispatch({ type: "ADD_LINK" })} className="p-[11px] w-full rounded-lg border border-custom_blue font-semibold text-custom_blue mb-6">+ Add new link</button>
        </div>

        {
          state.links && state.links.length > 0 ? (

            state.links.map((items, i: number) => {
              return (
                <LinkCard {...items} key={i} />
              )
            })
          )
            :
            (<div className="py-[62.5px]   text-center px-5 bg-custom_offwhite rounded-xl">
              <Image src='/pics/hand-phone.png' className=" m-auto mb-10" alt="" width={249.53} height={160} />

              <div className="max-w-[488px] m-auto">
                <h3 className="text-custom_dark mb-8 text-[32px] font-bold">Let’s get you started</h3>
                <p className="text-custom_deep_gray ">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
              </div>

            </div>)
        }


      </div>
      <div className="flex py-6 px-10 border-t">
        <button onClick={handleSubmit} className="ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]">Save</button>
      </div>
    </div>
  )
}

export default Page