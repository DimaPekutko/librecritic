import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const useAxios = () => {
    const {tokens, setTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        headers:{Authorization: `Bearer ${tokens?.access}`}
    });

    axiosInstance.interceptors.request.use(async req => {
    
        console.log("req")

        const user = jwt_decode(tokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        console.log("refresh")

        const response = await axios.post(`/api/token/refresh/`, {
            refresh: tokens.refresh
          });
    
        localStorage.setItem('auth_tokens', JSON.stringify(response.data))
        
        setTokens(response.data)
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })
    return axiosInstance
}

export default useAxios;