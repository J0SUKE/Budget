import React, { useState } from "react"

export const ThemeCntxt = React.createContext();

export default function ThemeContext({children}) 
{  
    
    const [dark,setDark] = useState(false);

    return <ThemeCntxt.Provider value={{dark,setDark}}>
        {children}
    </ThemeCntxt.Provider>
}
