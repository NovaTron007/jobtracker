import React, { useState } from 'react'
import Wrapper from "../assets/Wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa"
import { useAppContext } from '../Context/AppContext.js'
import Logo from "./Logo.js"

const Navbar = () => {

  // get global state from context 
  const { toggleSidebar, showSidebar } = useAppContext()
  // local state: show logout button
  const [showLogoutBtn, setShowLogoutBtn] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => console.log("toggle sidebar")}>
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
              Dwayne
            <FaCaretDown />
          </button>
          {/* logout button */}
          <div className={showLogoutBtn ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log("logout user")}
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