
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../Data/SupabaseData.jsx';

const UserAuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user) {
                    setUser(value.data.user);
                } else {
                    setUser({});
                }
            });
        }
        getUserData();
    }, []);

    return (
        <UserAuthContext.Provider value={user}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUser() {
    return useContext(UserAuthContext);
}
