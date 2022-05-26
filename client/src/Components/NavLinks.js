import React from 'react'
import { NavLink } from "react-router-dom"
import links from "../utils/links"


const NavLinks = ({toggleSidebar}) => {
    
  return (
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
                    onClick={toggleSidebar} // toggle sidebar
                >
                    <span className="icon">{icon}</span>
                    {text}
                </NavLink>
            )
        })}
    </div>
  )
}

export default NavLinks