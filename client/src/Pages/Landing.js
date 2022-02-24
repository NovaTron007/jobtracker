import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/Wrappers/Testing' // use styled component func name, then file name

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <img src={logo} className="logo" alt="" />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>Job<span>tracker</span></h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, amet recusandae itaque quidem tempore atque ex rem quasi, aliquam, 
                    consectetur sit quia error expedita nobis ducimus earum placeat natus voluptatum!
                </p>
                <button className="btn btn-hero">Login/Register</button>
            </div>
            <img src={main} alt="jobtracker" className="img main-img" />
        </div>
    </Wrapper>

  )
}

export default Landing