import React from 'react'
import SignIn from '../components/SignIn'
import { Outlet } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
        <SignIn/>
        <Outlet/>
    </div>
  )
}

export default HomePage
