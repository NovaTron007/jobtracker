import { useState } from 'react'
import Wrapper from "../assets/Wrappers/RegisterPage"
import { Alert, FormRow, Logo } from '../Components' // loaded in index.js
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
    const [values, setValues] = useState(initialState)

	// get global state, dispatch actions from context
	const { showAlert, displayAlert } = useAppContext()
	
	// get onChange value in form row
    const handleChange = (e) => {
		// spread original values and add new values
        setValues({...values, [e.target.name]: e.target.value}) // [dynamic key]
    }

	// set member
	const toggleMember = () => {
		setValues({...values, isMember: !values.isMember})
	}

	// submit form
	const onSubmit = (e) => {
		e.preventDefault()
		// get local state values
		const { name, email, password, isMember } = values
		// check fields
		if(!email || !password || (!isMember && !name)) {
			// action
			displayAlert()
		}
		return
	}
	
	

    return (
      <Wrapper className="full-page">
		<form className="form" onSubmit={onSubmit}>
			<Logo />
			
			{/* title */}
			<h2>{ values.isMember ? "Login" : "Register" }</h2>
			
			{/* alert message */}
			{ showAlert && <Alert /> }
			
			{/* name: pass name and value to input */}
			{ !values.isMember &&
				<FormRow 
					type="text" 
					name="name" 
					labelText="Name" 
					value={values.name} 
					handleChange={handleChange} 
				/>
			}
			{/* email: pass name and value to input */}
			<FormRow 
				type="email" 
				name="email" 
				labelText="Email" 
				value={values.email}  
				handleChange={handleChange} 
			/>
			{/*password: pass name and value to input*/}
			<FormRow 
				type="password" 
				name="password" 
				labelText="Password" 
				value={values.password}  
				handleChange={handleChange} 
			/>
			<button type="submit" className="btn btn-block">Submit</button>
			<p>
				{values.isMember ? "Not yet a member?" : "Already a member?"}
				<button 
					type="button" 
					className="member-btn" 
					onClick={toggleMember}>{values.isMember ? "Register" : "Login"}
				</button>
			</p>
		</form>
      </Wrapper>
  )
}

export default Register