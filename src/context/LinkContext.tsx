'use client'
import { LinkType } from '@/app/editor/page';
import { db } from '@/components/firebaseConfig';
import { onValue, ref, remove } from 'firebase/database';
import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect, useState } from 'react';
import { uid } from 'uid';
import { useAuthLink } from './AuthContext';

export type Link = {
    id: string;
    name: string;
    link: string;
};

type State = {
    links: Link[];
};

type Action = {
    type: string;
    payload?: any;
};

const initialState: State = {
    links: [],
};

function reducer(state: State, action: Action): State {
    const { payload, type } = action;
    switch (type) {
        case 'INITIALIZE_LINK':
            return {
                ...state,
                links: payload
            };
        case 'INITIALIZE_COPYLINK':
            if (state.links === payload) return state
            return {
                ...state,
                links: payload
            };
        case 'UPDATE_LINK':
            const { value, id } = payload;

            return {
                ...state,
                links: state.links.map(link => link.id === id ? { ...link, link: value } : link)
            };
        case 'UPDATE_ICON_AND_NAME': {
            const { name, id, } = payload;
            return {
                ...state,
                links: state.links.map(link => link.id === id ? { ...link, name } : link)
            };
        }
        case 'REMOVE_LINK':
            return {
                ...state,
                links: state.links.filter(link => link.id !== payload.id)
            };
        case 'ADD_LINK':
            const uuid: string = uid();
            const linkForm: Link = {
                id: uuid,
                name: '',
                link: '',
            };
            return {
                ...state,
                links: [...state.links, linkForm]
            };
        default:
            return state;
    }
}

interface LinkContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    fetchInitialData: (id: string) => any;
    loading: boolean;
    removeLink: (uid: string, id: string) => any;
}

export const LinkContext = createContext<LinkContextProps | undefined>(undefined);

type LinkContextProviderProps = {
    children: ReactNode;
};

const LinkContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)



    const removeLink = async (uid: string, id: string) => {
        try {
            const itemRef = ref(db, `/items/${uid}/${id}`)
            await remove(itemRef)
        } catch (err) {
            console.log(err);
        }
    }

    const fetchInitialData = async (id: string) => {
        try {
            const dbRef = ref(db, `/items/${id}`);


            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();

                const payload = data && Object.values(data) as LinkType[];

                if (payload) {
                    const sortLink = payload?.sort((a: LinkType, b: LinkType) => (a?.order ?? 0) - (b?.order ?? 0));
                    const sorted = sortLink && Object.values(sortLink) as LinkType[];
                    dispatch({ type: 'INITIALIZE_LINK', payload: sorted })
                }

                if (!payload) {
                    dispatch({ type: 'INITIALIZE_LINK', payload: [] })
                }
            });

            return () => unsubscribe();

        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
            setLoading(false)

        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LinkContext.Provider value={{ state, dispatch, fetchInitialData, loading, removeLink }}>
            {children}
        </LinkContext.Provider>
    );
};

export default LinkContextProvider;

export const useLink = (): LinkContextProps => {
    const context = useContext(LinkContext);
    if (context === undefined) {
        throw new Error('useLink must be used within a LinkContextProvider');
    }
    return context;
};
