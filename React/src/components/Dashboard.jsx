import { Outlet, Link } from 'react-router-dom'
import '../css/dashboard.css'
import DisplayHerds from './DisplayHerds'
import NavBar from './NavBar'

//This is a react component
const Dashboard = () => {

    return (
        <>
            <NavBar />
            <DisplayHerds />
            <Outlet />
        </>
    )
}
export default Dashboard