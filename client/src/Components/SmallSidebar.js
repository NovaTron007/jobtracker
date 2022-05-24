import React from 'react'
import { NavLink } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import links from "../utils/links"
import Wrapper from "../assets/Wrappers/SmallSidebar"
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
                    <div className="nav-links">
                        {links.map((item) => {
                            // destructure current item object
                            const { text, path, id, icon } = item
                            // use return as two items inside map
                            return (
                                <NavLink
                                    key={id}
                                    to={path}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} // navlink active class
                                    onClick={toggleSidebar}
                                >
                                    <span className="icon">{icon}</span>
                                    {text}
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSideBar