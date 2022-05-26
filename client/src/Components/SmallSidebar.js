import React from 'react'
import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import Wrapper from "../assets/Wrappers/SmallSidebar"
import NavLinks from './NavLinks'
import { useAppContext } from "../Context/AppContext" // get app global state

const SmallSideBar = () => {
    // get global state, and functions
    const { toggleSidebar, showSidebar } = useAppContext()

    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSideBar