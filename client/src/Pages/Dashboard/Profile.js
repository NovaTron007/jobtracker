import React, { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import Wrapper from "../../assets/Wrappers/DashboardFormPage"
import Alert from "../../Components/Alert"
import { FormRow } from '../../Components'


const Profile = () => {
    const { user, showAlert, displayAlert, isLoading, updateUser } = useAppContext()

    // load user details from (api -> set in global state) if any
    console.log("user fed: ", user)
    const [name, setName] = useState(user?.name)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)
    const [email, setEmail] = useState(user?.email)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !lastName || !location || !email) {
            displayAlert()
            return
        }
        // update: send object with local state
        updateUser({ name, lastName, location, email })
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Profile</h3>

                {showAlert && <Alert />}

                {/* pass handleChange and get target value back from input */}
                <div className="form-center">
                    <FormRow type="text" name="name" labelText="Name" value={name} handleChange={(e) => setName(e.target.value)} />
                    <FormRow type="text" name="lastName" labelText="Last Name" value={lastName} handleChange={(e) => setLastName(e.target.value)} />
                    <FormRow type="email" name="email" labelText="Email" value={email} handleChange={(e) => setEmail(e.target.value)} />
                    <FormRow type="text" name="location" labelText="location" value={location} handleChange={(e) => setLocation(e.target.value)} />
                
                    <button className="btn btn-block" type="submit" disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile