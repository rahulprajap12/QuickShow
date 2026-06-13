import React from 'react'
import AdminNavibar from '../../components/admin/AdminNavibar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <AdminNavibar/>
    <div>
        <AdminSidebar/>
        <div className='ml-64 mt-16'>
            <Outlet/>

        </div>
    
    </div>
    </>
  )
}

export default Layout
