/* eslint-disable @typescript-eslint/no-explicit-any */
// import Store from 'electron-store';
import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const store = new Store();
interface LoginContextType {
    isLoggedIn: boolean;
    login: (values: any) => void;
    logout: () => void;
    devices: any;
    setDevices: (devices: any) => void;
    navigateToHome: () => void
}
interface LoginProviderProps {
    children: ReactNode;
}

// async function callSetUpApi() {
//     try {
//         const response = await fetch("http://localhost:8086/api/connect/setup");
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//             }
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         console.error("Error calling setup API:", err);
//         return null;
//     }
// }

async function callLoginApi(username: string, password: string) {
    try {
        const response = await fetch("http://localhost:8086/api/auth/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username, password})});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error calling login API:", err);
        return null;
    }
}



export const AuthContext = createContext<LoginContextType | undefined>(undefined);

export const AuthProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [devices, setDevices] = useState<any>({});
    
    const navigate = useNavigate();
    const login = async (values: any) => {
        
        try {
            await callLoginApi(values?.username, values?.password);
            setIsLoggedIn(true);
            navigate("/test");    
        } catch(err){
            console.log(err)
        }
        
        
    };

    const logout = () => {
        setIsLoggedIn(false);
        setDevices({})
        navigate("/");
        // store.delete('isLoggedIn');
    };

    const navigateToHome = () => {
        navigate("/home")
    }

    const value = useMemo(
        () => ({ isLoggedIn, login, logout, devices, setDevices, navigateToHome }),
        [isLoggedIn]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
