'use client'
import LinkCard from "@/components/LinkCard";
import { Link, useLink } from "@/context/LinkContext";
import Image from "next/image"
import { auth, db } from '@/components/firebaseConfig'
import { get, onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { uid } from "uid";
import { useAuthLink } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd'
import { Reorder } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Define the type for links
export type LinkType = {
  name: string;
  link: string;
  id: string;
  order?: number;
};
const Page = () => {
  const { dispatch, state, fetchInitialData, loading } = useLink()
  const { authDispatch, authState, fetchInitialAuthData } = useAuthLink()
  const [uploadError, setUploadError] = useState("")
  const [copyLink, setCopyLink] = useState<LinkType[]>([])
  const [initialize, setInitialize] = useState(false)
  const [dbLoad, setDbLoad] = useState(false)

  useEffect(() => {
    authState.profile.id && fetchInitialData(authState.profile.id)
  }, [authState.profile.id])

  useEffect(() => {
    setCopyLink(state.links)
  }, [state.links])

  useEffect(() => {
    setInitialize(true)
    if (initialize) {
      dispatch({ type: "INITIALIZE_LINK", payload: copyLink })
    }
  }, [copyLink])


  // write to database
  const handleSubmit = async () => {
    try {
      // setDbLoad(true)

      const updates: { [key: string]: any } = {};


      copyLink.forEach((item, i) => {
        const itemWithOrder = { ...item, order: i };

        if (!itemWithOrder.link || !itemWithOrder.name) {
          setUploadError("Item not Saved!!! Link or Name   cannot be Empty.")
          setTimeout(() => setUploadError(''), 3000)
          return
        }
        updates[`/items/${authState.profile.id}/${item.id}`] = itemWithOrder;
      });

      await update(ref(db), updates)
      toast("Link Saved Successfully")
      // setDbLoad(false)

    } catch (err) {
      console.log(err);

    }
  }

  const addLink = () => {

    const uuid: string = uid();
    const linkForm = {
      id: uuid,
      name: '',
      link: '',
    };
    setCopyLink(prev => [linkForm, ...prev])
  }


  return (
    <div>
      <div className=" p-6 md:p-10 ">
        <div className="">

          <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
          <p className="font-normal text-custom_deep_gray mb-10">Add/edit/remove links below and then share all your profiles with the world!</p>
          <button onClick={addLink} className="p-[11px] w-full rounded-lg border border-custom_blue font-semibold text-custom_blue mb-6 hover:bg-custom_light_blue2 transition duration-200">+ Add new link</button>
          {uploadError && <p className="text-red-900">{uploadError}</p>}
        </div>
        <div className="  h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-white scrollbar-track-rounded-full  scrollbar-thumb-rounded-full">
          <Reorder.Group values={copyLink} onReorder={setCopyLink}>

            {

              loading ? "Loading Links..." : copyLink && copyLink.length > 0 ? (


                copyLink.map((items, i: number) => {
                  return (
                    <Reorder.Item value={items} key={items.id}>
                      <LinkCard
                        {...items}
                        setCopyLink={setCopyLink}
                        copyLink={copyLink}
                        i={i}
                        key={i} />
                    </Reorder.Item>
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
          </Reorder.Group>

        </div>


      </div>
      <div className="flex py-6 px-10 border-t">
        <button onClick={handleSubmit} disabled={copyLink.length < 1 || !!dbLoad} className={`${copyLink.length < 1 ? 'bg-custom_light_blue1 cursor-not-allowed' : ''} ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]`}>Save</button>
      </div>
    </div>
  )
}

export default Page
