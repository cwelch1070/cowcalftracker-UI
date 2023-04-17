import { Outlet, Link } from 'react-router-dom'
import '../css/dashboard.css'
import DisplayHerds from './DisplayHerds'
import NavBar from './NavBar'

//This is a react component
const Dashboard = () => {

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='container'>
                <DisplayHerds />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}
export default Dashboard