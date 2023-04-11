import { Outlet, Link } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import '../css/dashboard.css'
import DisplayHerds from './DisplayHerds'
import NavBar from './NavBar'

/* const DefaultCard = () => {
    const [inputList, setInputList] = useState([]);

    const createHerd = event => {
        setInputList(inputList.concat(<Card key={inputList.length} />));
    }

    return (
        <>
        <div className='container'>
            <div className='cards'>
                <div className='defaultCard card-margin' onClick={createHerd}>
                    + New Herd
                </div>
                {inputList}
            </div>
        </div> 
        </>
    )
} */

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
                {/* <Link to={`cattle`}>Display Cattle</Link> */}
            </div>
        </>
    )
}
export default Dashboard