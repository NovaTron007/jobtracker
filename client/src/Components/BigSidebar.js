import React from 'react'
import Wrapper from "../assets/Wrappers/BigSidebar"
import Logo from "../Components/Logo"
import NavLinks from './NavLinks'
import { useAppContext } from '../Context/AppContext'

const BigSidebar = () => {
  // get global state, and functions
  const { showSidebar } = useAppContext()

  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"} >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar