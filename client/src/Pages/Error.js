import React from 'react'
import NotFoundImg from "../assets/images/not-found.svg"
import Wrapper from "../assets/Wrappers/ErrorPage"

const Error = () => {
  return(
    <Wrapper className="full-page">
        <div>
            <img src={NotFoundImg} alt="not-found" />
            <h3>Ohh page not found!</h3>
            <p>We can't seem to find the page you're looking for.</p>
        </div>
    </Wrapper>
  )
}

export default Error