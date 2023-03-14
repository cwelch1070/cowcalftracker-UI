import { Outlet, Link } from 'react-router-dom'
import '../css/dashboard.css'

const Dashboard = () => {

    const createHerd = () => {
        console.log('The New Herd button was clicked!')
    }

    return (
        <div>
            <div className='nav-bar-container'>
                <div className='logo'>
                    <p>CowCalfTracker</p>
                </div>
                <div className='search-bar'>
                    <input placeholder='Search'/>
                </div>
            </div>
            
            <div className='container'>
                <div className='cards'>
                    <div className='defaultCard card-margin' onClick={createHerd}>
                        + New Herd
                    </div>
                    <div className='herdCard card-margin'>
                        <button className='optionsBtn'>. . .</button>
                        <h4>North Pasture</h4>
                        <p>10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard

/* 
    TODO

    Design dashboard
        - Dashboard needs to have something on it. Possibly a nav bar of some sort with some default 
          information on it? 

          Design like a file system. Herds are folders and cattle are files. Cattle have contents 
          which the information such as name, tag, and notes.

    Cattle Pages
        - Can be loaded with child page from nav bar or button clicks. 
*/