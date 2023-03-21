import React from "react"
import logo from "../assets/images/logo.svg" // import logo svg
import LogoPng from "../assets/images/logo.png" // import logo png

const Logo = () => {
  return (
        // <img src={logo} alt="jobtracker" className="logo"/>
        <div style={{display: "block", textAlign: "center"}}>
          <img src={LogoPng} alt="jobtracker" className="logoPng" style={{width: 40}}/>
        </div>

  )
}

export default Logo