import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../css/auth-pages.css'
import { createUser } from '../API-Requests/loginAPI'

// Renders the Create Account page
export default function CreateAccount() {
    const navigate = useNavigate()

    // State variables to store email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Calls function to send request to api to create user and returns the status of the request
            const res = await createUser(email, password)
            
            // If server responds with 201 status login to dashboard
            if(res === 201) {
                navigate('/Dashboard')
            }
        } catch (error) {
            console.error(`Failed to create user: ${error}`)
        }
    }

    return ( 
        <div className='container login'>
            <div className='formPosition'>
                <h1>CowCalfTracker</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input className='form-control' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <input className='form-control' type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-success' type='submit'>Create Account</button>
                    </div>
                </form>
                <div>
                    <p>Already have an account? <Link to={'/'}>Login</Link></p>
                </div>
            </div>
        </div>
    )
} 