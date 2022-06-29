import React, { useContext, useEffect } from 'react'
import {userContext} from '../Context/UserContext';
import Dashboard from '../components/Dashboard/Dashboard';


export default function DashboardPage() {
  
    const {user} = useContext(userContext);

    return (
    <>
        {
            user?
            <Dashboard/>
            :
            null

        }
    </>
  )
}
