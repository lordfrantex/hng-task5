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

export type LinkType = {
  name: string;
  link: string;
  id: string;
  order?: number;
};

const Page = () => {
  const { dispatch, state, fetchInitialData, loading } = useLink();
  const { authDispatch, authState, fetchInitialAuthData } = useAuthLink();
  const [uploadError, setUploadError] = useState("");
  const [copyLink, setCopyLink] = useState<LinkType[]>([]);
  const [dbLoad, setDbLoad] = useState(false);

  useEffect(() => {
    if (authState.profile.id) {
      fetchInitialData(authState.profile.id);
    }

  }, [authState.profile.id]);

  useEffect(() => {
    setCopyLink(state.links);
  }, [state.links]);


  // const handleSubmit = async () => {
  //   try {
  //     const updates: { [key: string]: any } = {};
  //     copyLink.forEach((item, i) => {
  //       const itemWithOrder = { ...item, order: i };
  //       if (!itemWithOrder.link || !itemWithOrder.name) {
  //         setUploadError("Item not Saved!!! Link or Name cannot be Empty.");
  //         setTimeout(() => setUploadError(''), 3000);
  //         return;
  //       }
  //       updates[`/items/${authState.profile.id}/${item.id}`] = itemWithOrder;
  //     });
  //     if (!uploadError) {
  //       console.log(uploadError);

  //     } else {
  //       console.log(uploadError);
  //       await update(ref(db), updates);
  //       toast("Link Saved Successfully");
  //     }


  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const updates: { [key: string]: any } = {};
      let hasError = false;

      copyLink.forEach((item, i) => {

        const itemWithOrder = { ...item, order: i };
        // Validate item and check for errors
        if (!itemWithOrder.link || !itemWithOrder.name) {
          setUploadError("Item not Saved!!! Link or Name cannot be Empty.");
          setTimeout(() => setUploadError(''), 3000);
          hasError = true;
          return;
        }


        if (!isValidUrl(itemWithOrder.link)) {
          toast("Invalid URL format: Ensure ALL links follows this format: https://www.example.com.");
          // setTimeout(() => setUploadError(''), 3000);
          hasError = true;
          return;
        }
        // Add valid item to updates
        updates[`/items/${authState.profile.id}/${item.id}`] = itemWithOrder;
      });

      // Proceed with update if no errors
      if (!hasError && !uploadError) {
        console.log('order');

        await update(ref(db), updates);
        toast("Link Saved Successfully");
      }
    } catch (err) {
      console.error("An error occurred while updating the database:", err);
    }
  };


  const addLink = () => {
    const uuid: string = uid();
    const linkForm = {
      id: uuid,
      name: '',
      link: '',
    };
    setCopyLink(prev => [linkForm, ...prev]);
  };

  return (
    <div>
      <div className="p-6 md:p-10">
        <div>
          <h2 className="text-custom_dark mb-2 text-[32px] font-bold">Customize your links</h2>
          <p className="font-normal text-custom_deep_gray mb-10">Add/edit/remove links below and then share all your profiles with the world!</p>
          <button onClick={addLink} className="p-[11px] w-full rounded-lg border border-custom_blue font-semibold text-custom_blue mb-6 hover:bg-custom_light_blue2 transition duration-200">+ Add new link</button>
          {uploadError && <p className="text-red-900">{uploadError}</p>}
        </div>
        <div className="h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-white scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
          <Reorder.Group values={state.links} onReorder={(newOrder) => dispatch({ type: "INITIALIZE_LINK", payload: newOrder })}>
            {loading ? "Loading Links..." : copyLink && copyLink.length > 0 ? (
              copyLink.map((items, i: number) => (
                <Reorder.Item value={items} key={items.id}>
                  <LinkCard
                    {...items}
                    setCopyLink={setCopyLink}
                    copyLink={copyLink}
                    i={i}
                    key={i} />
                </Reorder.Item>
              ))
            ) : (
              <div className="py-[62.5px] text-center px-5 bg-custom_offwhite rounded-xl">
                <Image src='/pics/hand-phone.png' className="m-auto mb-10" alt="" width={249.53} height={160} />
                <div className="max-w-[488px] m-auto">
                  <h3 className="text-custom_dark mb-8 text-[32px] font-bold">Let’s get you started</h3>
                  <p className="text-custom_deep_gray">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                </div>
              </div>
            )}
          </Reorder.Group>
        </div>
      </div>
      <div className="flex py-6 px-10 border-t">
        <button onClick={handleSubmit} disabled={copyLink.length < 1 || !!dbLoad} className={`${copyLink.length < 1 ? 'bg-custom_light_blue1 cursor-not-allowed' : ''} ms-auto px-[27px] rounded-lg text-white bg-custom_blue py-[11px]`}>Save</button>
      </div>
    </div>
  );
}

export default Page;

