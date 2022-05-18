import { createContext, useState, useEffect } from 'react'
// import jwt_decode from "jwt-decode";

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [tokens, setTokens] = useState(()=> {
        let localTokens = localStorage.getItem("auth_tokens")
        return localTokens ? JSON.parse(localTokens) : null
    })
    let [user, setUser] = useState(()=> {
        let localUser = localStorage.getItem("user_data")
        return localUser ? JSON.parse(localUser) : null
    })
    
    let navigate = useNavigate()

    const get_user_data = async (accessToken) => {
        const res = await fetch("/api/user/", {
            method: "POST",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : "Bearer " + String(accessToken)
            },
        })
        return await res.json()
    }

    const login = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/token/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json" 
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password:  e.target.password.value
            })
        })
        if (res.status === 200) {
            const data = await res.json()
            const user = await get_user_data(data.access)
            setTokens(data)
            setUser(user)
            localStorage.setItem("auth_tokens", JSON.stringify(data))
            localStorage.setItem("user_data", JSON.stringify(user))
            navigate("/")
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        setTokens(null)
        setUser(null)
        localStorage.removeItem("auth_tokens")
        localStorage.removeItem("user_data")
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{
            login: login,
            logout: logout,
            user: user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
