import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (credentials.password === credentials.cpassword) {
            const response = await axios.post('https://m-books.onrender.com/api/auth/createuser', {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            });

            const json = await response.data    
            console.log(json)
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                props.showAlert("Account created Successfully", "success")
                navigate("/")
            }
            else {
                props.showAlert("Invalid Details", "danger")
            }
        }
        else{
            props.showAlert("Confirm password doesnot match password","danger")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container' style={{justifyContent: 'center',display: 'flex',alignItems: 'center'}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp" style={{width:'300px'}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" style={{width:'300px'}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required style={{width:'300px'}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={5} required style={{width:'300px'}}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
