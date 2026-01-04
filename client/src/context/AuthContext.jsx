import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
    }

    const logout = async () => {

        try {
            await api.post("/logout");
        } catch(err) {
            // Ignore
        }
        localStorage.removeItem("accessToken");
        setUser(null);
        setToken(null);
    }
    const loadUser = async () => {
        try {
            const res = api.get("/user/me");
            setUser(res.data.user);
        } catch (e) {
            logout();
        }
    } 
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(token){
            loadUser();
        }
    }, []);


    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            loading,
            login,
            logout,
            isAuthenticated: !!token,
        }}
        >{children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}