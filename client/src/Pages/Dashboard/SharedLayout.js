import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from "../../assets/Wrappers/SharedLayout"
import { Navbar, SmallSidebar, BigSidebar } from "../../Components/"

const SharedLayout = () => {
  return (
      <Wrapper>
          <main className="dashboard">
              <SmallSidebar />
              <BigSidebar />
              <div>
                <Navbar />
                <div className="dashboard-page">
                    <Outlet />{/* show routes nested inside SharedLayout's Route path */}
                </div>
              </div>
          </main>
      </Wrapper>
  )
}

export default SharedLayout