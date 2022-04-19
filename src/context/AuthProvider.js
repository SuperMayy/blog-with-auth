import { useState, createContext } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [tokenIsValid, setTokenIsValid] = useState(false)

    return (
        <AuthContext.Provider value={{auth, setAuth, tokenIsValid, setTokenIsValid}}>
            {children}
        </AuthContext.Provider>
    )
}