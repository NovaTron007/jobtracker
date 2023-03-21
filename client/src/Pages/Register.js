import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Wrapper from "../assets/Wrappers/RegisterPage"
import { Alert, Footer, FormRow, Logo } from '../Components' // loaded in index.js
import { useAppContext } from '../Context/AppContext'

// initial state object
const initialState = {
    name: "",
    email: "",
    password:"",
    isMember: true,
	showAlert: false
}

const Register = () => {
	// initial state object set state
    const [formValues, setFormValues] = useState(initialState)

	// get global state, dispatch actions from context
	const { user, showAlert, displayAlert, authUser } = useAppContext()

	// useNavigate
	const navigate = useNavigate()
	
	// get onChange value in form row
    const handleChange = (e) => {
		// spread original values and add new values
        setFormValues({...formValues, [e.target.name]: e.target.value}) // [dynamic key]
    }

	// set member
	const toggleMember = () => {
		setFormValues({...formValues, isMember: !formValues.isMember})
	}

	// submit form
	const onSubmit = (e) => {
		e.preventDefault()
		// get local state values
		const { name, email, password, isMember } = formValues
		// create user object from fields
		const currentUser = { name, email, password}
		// check fields
		if(!email || !password || (!isMember && !name)) {
			// action
			displayAlert()
			return
		}
		// submit, login or create user
		if(isMember)  {
			// login pass object with details
			authUser({currentUser, endpoint: "login", alertMessage: "Login successful!"})
		} else {
			// register pass object with details
			authUser({currentUser, endpoint: "register", alertMessage: "Register successful!"})
		}
	}
	
	// onmount: listen for user changes set in global state
	useEffect(() => {
		// if user retrieved from context
		if(user) {
			setTimeout(() => {
				navigate("/")
			}, 1000);
		}
	}, [user, navigate])




    return (
      <Wrapper className="full-page">
		<form className="form" onSubmit={onSubmit}>
			<Logo />
			
			{/* title */}
			<h2>{ formValues.isMember ? "Login" : "Register" }</h2>
			
			{/* alert message */}
			{ showAlert && <Alert /> }
			
			{/* name: pass name and value to input */}
			{ !formValues.isMember &&
				<FormRow 
					type="text" 
					name="name" 
					labelText="Name" 
					value={formValues.name} 
					handleChange={handleChange} 
				/>
			}
			{/* email: pass name and value to input */}
			<FormRow 
				type="email" 
				name="email" 
				labelText="Email" 
				value={formValues.email}  
				handleChange={handleChange} 
			/>
			{/*password: pass name and value to input*/}
			<FormRow 
				type="password" 
				name="password" 
				labelText="Password" 
				value={formValues.password}  
				handleChange={handleChange} 
			/>
			<button type="submit" className="btn btn-block" >Submit</button>
			{/* auto login with test user credentials */}
			<button type="button" className="btn btn-block btn-hipster" onClick={async () => {
				await authUser({
					currentUser: {name: "test", email:"test@test.com", password:"pass1234"}, endpoint: "login", 
					alertMessage: "Login successful! Redirecting..."
				})
			}}>Demo App</button>

			<p>
				{formValues.isMember ? "Not yet a member?" : "Already a member?"}
				<button 
					type="button" 
					className="member-btn" 
					onClick={toggleMember}>{formValues.isMember ? "Register" : "Login"}
				</button>
			</p>
		</form>
		<Footer />
      </Wrapper>
  )
}

export default Register