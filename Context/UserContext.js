import React, {useState} from 'react';
import { useRouter } from 'next/router'

export const userContext = React.createContext(null);


export default function UserContext({children}) {
  
    const [user,setuser] = useState(null);
    const router = useRouter();

    function setUser(user) 
    {
        setuser(user);
        window.localStorage.setItem('user',JSON.stringify(user));
    }

    return <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
}
