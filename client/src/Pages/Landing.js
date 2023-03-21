import { Link } from "react-router-dom"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/Wrappers/Testing" // import styled component (name how we like)
import { Footer } from "../Components"
import Logo from "../Components/Logo"

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>Job<span>tracker</span></h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, amet recusandae itaque quidem tempore atque ex rem quasi, aliquam, 
                    consectetur sit quia error expedita nobis ducimus earum placeat natus voluptatum!
                </p>
                <Link to="/register" className="btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} alt="jobtracker" className="img main-img" />
        </div>
        <Footer />

    </Wrapper>

  )
}

export default Landing