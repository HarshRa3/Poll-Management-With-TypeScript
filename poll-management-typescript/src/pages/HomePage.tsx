import React from 'react'
import SignIn from '../components/SignIn'
import { Outlet, useLocation } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
        <SignIn/>
        <Outlet/>
    </div>
  )
}

export default HomePage
