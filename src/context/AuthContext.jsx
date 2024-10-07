/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { getUserApi } from "../apis/user";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    logout: () => { },
    isLoading: false,
    getCurrentUser: () => { }
});

function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const getCurrentUser = async () => {
        setIsLoading(true)

        const { success, data } = await getUserApi()
        if (success) {
            setUser(data.data);
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("userId")
    };

    const values = {
        user,
        isAuthenticated,
        logout,
        isLoading,
        getCurrentUser
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)