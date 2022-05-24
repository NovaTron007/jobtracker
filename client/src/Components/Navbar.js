import React, { useState } from 'react'
import Wrapper from "../assets/Wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa"
import { useAppContext } from '../Context/AppContext.js'
import Logo from "./Logo.js"

const Navbar = () => {

  // get global state from context 
  const { toggleSidebar, logoutUser, user } = useAppContext()
  // local state: show logout button
  const [showLogoutBtn, setShowLogoutBtn] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        {/* toggleSidebar context function */}
        <button className="toggle-btn" onClick={toggleSidebar}>
        <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          {/* profile button: toggle logout button */}
          <button type="button" className="btn" onClick={() => setShowLogoutBtn(!showLogoutBtn)}>
            <FaUserCircle/>
              {user?.name} {/* optional chaining */}
            <FaCaretDown />
          </button>
          {/* logout button */}
          <div className={showLogoutBtn ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
              >
                Logout
              </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar