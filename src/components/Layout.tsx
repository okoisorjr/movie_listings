import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <React.Fragment>
        <div className='container grid grid-cols-12 min-h-screen overflow-scroll mx-auto text-white'>
          <div className='col-span-12'>
              {/* <div className='w-full'> */}
                  <Outlet />
              {/* </div> */}
          </div>
        </div>
        <Footer/>
    </React.Fragment>
  )
}

export default Layout