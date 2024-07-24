// 'use client'
// import React, { createContext, useContext, useReducer } from 'react'


// export const LinkContext = createContext(null)
// const initialState = {
//     links: [
//         {
//             id: '23sadfa',
//             name: 'some',
//             link: 'zsdflk/.sdkflkakflk.',
//             icon: 'adflkioiwemlkfmsowe'
//         }
//     ]
// }

// function reducer() {
//     return
// }

// const [state, dispatch] = useReducer(reducer, initialState)

// const LinkContextProvider = ({ children }) => {
//     return (
//         <LinkContext.Provider value={{ state, dispatch }}>{children}</LinkContext.Provider>
//     )
// }

// export default LinkContextProvider


// export const useLink = () => {
//     const context = useContext(LinkContext)
//     return context
// }

'use client'
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
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
    links: [
        {
            id: '23sadfa',
            name: '',
            link: '',
            icon: ''
            // icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'

        }
    ],
    userInfo: {
        firstName: '',
        lastName: '',
        email: ''

    }
};

function reducer(state: State, action: Action): State {
    const { payload, type } = action
    switch (type) {
        // Add your cases here
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
