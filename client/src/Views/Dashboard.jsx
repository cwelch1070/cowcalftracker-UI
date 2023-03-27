import { Outlet, Link } from 'react-router-dom'
import React, { useState } from "react"
import '../css/dashboard.css'

//This is a react component
const NavBar = () => {
    return (
        <div className='nav-bar-container'>
            <div className='logo'>
                <p>CowCalfTracker</p>
            </div>
            <div className='search-bar'>
                <input placeholder='Search'/>
            </div>
        </div>
    )
}

const DefaultCard = () => {
    const [inputList, setInputList] = useState([]);

    const createHerd = event => {
        setInputList(inputList.concat(<Card key={inputList.length} />));
    }

    return (
        <>
        <div className=''>
            <div className='cards'>
                <div className='defaultCard card-margin' onClick={createHerd}>
                    + New Herd
                </div>
                {inputList}
            </div>
        </div> 
        </>
        
    )
}

//This is a react component
const Card = () => {
    
    return (   
        <div className='herdCard card-margin'>
            <button className='optionsBtn'>. . .</button>
            <h4>North Pasture</h4>
            <p>10</p>
        </div>
    )
}

//This is a react component
const Dashboard = () => {

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div>
                <DefaultCard />
            </div>
        </>
    )
}
export default Dashboard