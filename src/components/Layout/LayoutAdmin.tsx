
import Sidebar from '../SidebarAdmin'
import NavbarAdmin from '../NavbarAdmin'
import { Outlet } from 'react-router-dom'
import logo from '@/assets/Logo.png'

const LayoutAdmin = () => {
  return (
    <div>
       <div className="flex h-full bg-base-100">
      <div className="flex-shrink-0 h-full z-50 top-0 sticky">
        <Sidebar logo={logo} />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex sticky top-0 z-50">
          <NavbarAdmin/>
        </div>
        <div className="flex-1 overflow-y-auto p-3 w-full bg-white">
          <Outlet />
        
        </div>
      </div>
    </div>
    </div>
  )
}

export default LayoutAdmin
