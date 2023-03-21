import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "40px", padding:"10px" }}>
            &copy; Dwayne Man {date}
        </span>
    )
}

export default Footer