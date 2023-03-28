import { Outlet, Link } from "react-router-dom";
import '../css/auth-pages.css'

const CreateAccount = () => {


    return ( 
        <div className='container login'>
            <div className='formPosition'>
                <h1>CowCalfTracker</h1>
                <form>
                    <div className='mb-3'>
                        <input className='form-control' type="email" placeholder='Email' />
                    </div>
                    <div className='mb-3'>
                        <input className='form-control' type="password" placeholder='Password'/>
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

export default CreateAccount