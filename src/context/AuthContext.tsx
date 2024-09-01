'use client'
import { auth, db } from '@/components/firebaseConfig';
import useFirebaseFetch from '@/utilities/FetchDB';
import { get, onValue, ref, set } from 'firebase/database';
import { getDownloadURL } from 'firebase/storage';
import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer, useState } from 'react'


type Action = {
    type: string;
    payload?: any;
};

export type UserState = {
    profile: {
        firstName: string;
        lastName: string;
        id: string;
        email: string;
        url: string;
    },
}


interface AuthContextProps {
    authState: UserState;
    authDispatch: Dispatch<Action>;
    loading: boolean,
    fetchInitialAuthData: (id: string) => any
}

const authReducer = (state: UserState, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case "INITIALIZE_STATE":
            return {
                ...state,
                profile: payload,
            }

        default:
            return state;
    }

}
const initialAuthState: UserState = {
    profile: {
        firstName: '',
        lastName: '',
        email: '',
        url: '',
        id: ''
    }
}


export const AuthContext = createContext<AuthContextProps | undefined>(undefined)
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
    const [loading, setIsLoading] = useState(true)



    const fetchInitialAuthData = async (id: string) => {

        try {
            const dbRef = ref(db, `users/${id}`);


            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) authDispatch({ type: "INITIALIZE_STATE", payload: data });
            });

            return () => unsubscribe();


        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <AuthContext.Provider value={{ authState, authDispatch, fetchInitialAuthData, loading }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuthLink = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useLink must be used within a AuthContextProvider');
    }
    return context;
};
