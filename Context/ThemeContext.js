import React, { useEffect, useState } from "react"

export const ThemeCntxt = React.createContext();

export default function ThemeContext({children}) 
{  
    
    const [dark,setdark] = useState(false);

    function setDark(dark) {
        localStorage.setItem('dark',dark)
        setdark(dark);
    }

    useEffect(()=>{
        
        if (localStorage.getItem('dark')=='undefined' || localStorage.getItem('dark')=='false') {
            setDark(false)
        }
        else
        {
            setDark(true);
        }
    },[])
    

    return <ThemeCntxt.Provider value={{dark,setDark}}>
        {children}
    </ThemeCntxt.Provider>
}
