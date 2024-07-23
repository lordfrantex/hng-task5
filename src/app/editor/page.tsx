'use client'
import LinkCard from "@/components/LinkCard";
import { ChevronDown, Equal, Facebook, Github, Linkedin, LinkIcon, Twitter } from "lucide-react";
import Image from "next/image"
import { ReactNode, useState } from "react";

const page = () => {

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

  const [availableLinks, setAvailableLinks] = useState<linkDataTypes[]>([
    {
      name: '',
      link: '',
      icon: ''
    }
  ])

  const addLink = () => {
    setAvailableLinks(prev => {
      return [
        ...prev,
        {
          name: '',
          link: '',
          icon: ''

        },

      ]
    })
  }

  return (
    <div>
      <div className="p-10 ">
        <div className="">

          <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
          <p className="font-normal text-custom_deep_gray mb-10">Add/edit/remove links below and then share all your profiles with the world!</p>
          <button onClick={addLink} className="p-[11px] w-full rounded-lg border border-custom_blue font-semibold text-custom_blue mb-6">+ Add new link</button>
        </div>
        {

          availableLinks && availableLinks.length > 0 ? (

            availableLinks.map((items, i: number) => {
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
        <button className="ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]">Save</button>
      </div>
    </div>
  )
}

export default page