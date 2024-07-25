'use client'
import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect, useState } from 'react';
import { uid } from 'uid';

type Link = {
    id: string;
    name: string;
    link: string;
    icon: string;
};

type State = {
    links: Link[],

    userInfo: {
        firstName: string,
        lastName: string,
        email: string
    }
};

type Action = {
    type: string;
    payload?: any;
};

const initialState: State = {
    links: [],
    userInfo: {
        firstName: '',
        lastName: '',
        email: ''

    }
};



function reducer(state: State, action: Action): State {
    const { payload, type } = action
    switch (type) {

        case 'INITIALIZE_LINK':
            return {
                ...state,
                links: payload
            }
            break;

        case 'UPDATE_LINK':
            const { value, id } = payload
            const findLink = state.links.map(link => link.id === id ? { ...link, link: value } : link)
            return {
                ...state,
                links: findLink

            }
            break;
        case 'UPDATE_ICON_AND_NAME': {

            const { name, id, icon } = payload

            const findNameAndIcon = state.links.map(link => link.id === id ? { ...link, name, icon } : link)

            return {
                ...state,
                links: findNameAndIcon

            }
        }

            break;

        case 'REMOVE_LINK':
            const removeLink = state.links.filter(link => link.id !== id)
            return {
                ...state,
                links: removeLink

            }
            break;

        case 'ADD_LINK':
            const uuid: string = uid()
            const linkForm: Link = {
                id: uuid,
                name: '',
                link: '',
                icon: ''
            }
            return {
                ...state,
                links: [...state.links, linkForm]
            }
            break;

        case 'FIRST_NAME':

            return {
                ...state,
                userInfo: { ...state.userInfo, firstName: payload }
            }
            break;
        case 'LAST_NAME':


            return {
                ...state,
                userInfo: { ...state.userInfo, lastName: payload }
            }
            break;
        case 'EMAIL':


            return {
                ...state,
                userInfo: { ...state.userInfo, email: payload }
            }
            break;


        default:
            return state;
    }
}




interface LinkContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

export const LinkContext = createContext<LinkContextProps | undefined>(undefined);

type LinkContextProviderProps = {
    children: ReactNode;
};

const LinkContextProvider = ({ children }: LinkContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const persistedLocalStorage = localStorage.getItem('links')
        if (persistedLocalStorage) {
            const parsedLink = JSON.parse(persistedLocalStorage)
            dispatch({ type: 'INITIALIZE_LINK', payload: persistedLocalStorage });
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }, [state, isInitialized]);


    return (
        <LinkContext.Provider value={{ state, dispatch }}>
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
