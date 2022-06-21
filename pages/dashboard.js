import React, { useContext, useEffect } from 'react'
import {userContext} from '../Context/UserContext';
import Dashboard from '../components/Dashboard/Dashboard';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

export default function DashboardPage() {
  
    const {user,setUser} = useContext(userContext);
    const router = useRouter();

    useEffect(()=>{
        if (!JSON.parse(window.localStorage.getItem('user'))) 
        {
            router.push('/login');
        }
        else
        {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    },[])


    return (
    <>
        <Layout>
        {
            user?
            <Dashboard user={user}/>
            :
            null

        }
        </Layout>
    </>
  )
}
