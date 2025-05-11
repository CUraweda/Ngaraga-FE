import React from 'react'
import Sidebar from '../SidebarAdmin'
import NavbarAdmin from '../NavbarAdmin'
import { Outlet } from 'react-router-dom'
import logo from '@/assets/Logo.png'

const LayoutAdmin = () => {
  return (
    <div>
       <div className="flex h-full bg-base-100">
      <div className="flex-shrink-0 h-full z-50">
        <Sidebar logo={logo} />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex">
          <NavbarAdmin/>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <Outlet />
         <div className='w-full flex justify-center my-5'>
          <a href="http://curaweda.com" target="_blank" rel="noopener noreferrer">  &copy; PT Curaweda Palagan Innotech @{new Date().getFullYear()}</a>
         </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LayoutAdmin
