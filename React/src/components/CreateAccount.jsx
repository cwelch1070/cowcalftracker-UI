import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../css/auth-pages.css'
import { setToken } from '../auth/store-token';

export default function CreateAccount() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://45.58.52.73:81/user/create', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }  
        })

        const data = await res.json()
        const token = data.token
        setToken(token)

        if(res.status === 201) {
            navigate('/Dashboard')
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