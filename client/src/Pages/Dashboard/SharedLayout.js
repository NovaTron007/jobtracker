import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from "../../assets/Wrappers/SharedLayout"

const SharedLayout = () => {
  return (
      <Wrapper>
          <nav>
              <Link to="/add-job">Add Job</Link>
              <Link to="/all-jobs">All Jobs</Link>
              <Link to="/stats">Stats</Link>
              <Link to="/profile">Profile</Link>
              {/* <Outlet /> */}
          </nav>
      </Wrapper>
  )
}

export default SharedLayout