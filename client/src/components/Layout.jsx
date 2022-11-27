import React from 'react'
import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
        <Outlet/>
    </div>
  )
}

export default Layout