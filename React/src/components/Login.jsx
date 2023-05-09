import react, { useState} from 'react'
import { login } from '../functions/loginAPI'
import { useNavigate, Link } from "react-router-dom"
import '../css/auth-pages.css'

// Renders login form
export default function Login() {
    // Allow to redirect user to dashboard
    const navigate = useNavigate()
    /*
        This creates a variable email and password and uses the state component
        in react to keep track of changes in the variables state.
        setEmail and setPasssword are used to "update" the variable. 
        This is the equivalent to creating an object in vanilla js
        and storing the user input in the key value pair defined in that object
        
        Example:
            const userData {
                    email: '',
                    password: ''
                }

            userData.email
            userData.password
    */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    /*
        This function handles the user login request to the server.
        It uses axios to send a post request to the server containing the email and password
        defined above.
    */
    const sendUserLogin = async (e) => {
        e.preventDefault() 
        try {
            // Calls function to send request to login user and returns status
            const res = await login(email, password)
            
            // If the status returned from the request is 200 login user
            if(res === 200) {
                console.log('Status code was 200!')
                navigate('/Dashboard')
            }
        } catch (error) {
            console.log(`Failed to login user: ${error}`)
        }
    }

    /*
        This is what is returned from the Login function and contains all the needed
        html to render the login page. Each input sets the email and password variable to 
        what the user inputed and is then sent off to the server when the login button is clicked. 
    */
    return (
        <div className='container login'>
            <div className='formPosition'>
                <h1>CowCalfTracker</h1>
                <form  onSubmit={sendUserLogin}>
                    <div className='mb-3'>
                        <input className='form-control' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <input className='form-control' type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-success' type='submit'>Login</button>
                    </div>
                </form>
                <div>
                    <p>Don't have an account? <Link to={'/CreateAccount'}>Create Account</Link></p>
                </div>
            </div>
        </div>
    )
}