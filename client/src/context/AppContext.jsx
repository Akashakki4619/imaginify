import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credit,Setcredit] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const navigate = useNavigate()

    const loadCreditsData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/credits',{headers:{token}})
            if(data.success)
            {
                Setcredit(data.credits);
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async(promt)=>{
        try {
        const {data}= await axios.post(backendUrl+'/api/image/generate-image',{promt:promt},{headers:{token}})
        if(data.success)
        {
            loadCreditsData()
            return data.resultImage
        }
        else
        {
            toast.error(data.message)
            loadCreditsData()
            if(data.creditBalance===0)
            {
                navigate('/buy')
            }
        }

        } catch (error) {


            toast.error(error.message)
        }
    }

    const logout =()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token)
        {
            loadCreditsData()
        }
    },[token])

    const value = {
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,Setcredit,logout,generateImage
        ,loadCreditsData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
}
export default AppContextProvider