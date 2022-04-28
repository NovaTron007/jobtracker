import {useState, useEffect } from 'react'
import Wrapper from "../assets/Wrappers/RegisterPage"
import { Alert, FormRow, Logo } from '../Components' // loaded in index.js

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
	// get onChange value in form row
    const handleChange = (e) => {
        console.log(e.target)
    }
	// submit form
    const onSubmit = (e) => {
        e.preventDefault()
    }
	// is member
	const toggleMember = () => {
		setValues({...values, isMember: !values.isMember})
	}

    
    return (
      <Wrapper className="full-page">
		<form className="form" onSubmit={onSubmit}>
			<Logo />
			
			{/* title */}
			<h2>{ values.isMember ? "Login" : "Register" }</h2>
			
			{/* alert message */}
			{ values.showAlert && <Alert message="Error submitting" /> }
			
			{/* name */}
			{ !values.isMember &&
				<FormRow 
					type="text" 
					labelName="name" 
					labelText="Name" 
					value={values.name} 
					handleChange={handleChange} 
				/>
			}
			{/* email */}
			<FormRow 
				type="email" 
				labelName="email" 
				labelText="Email" 
				value={values.email}  
				handleChange={handleChange} 
			/>
			{/*password*/}
			<FormRow 
				type="password" 
				labelName="password" 
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