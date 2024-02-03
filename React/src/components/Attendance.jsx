import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { getCows } from '../API-Requests/cattleAPI'
import Navbar from './NavBar'
import '../css/CattleCheckbox.css'

function Checklist({ cattle }) {
    return (
        <div>
            {cattle.length > 0 && (
                <div>
                    {cattle.map((cow) => (
                        <div key={cow._id} className="form-check" id="cattle-check-box">
                             <input type="checkbox" className="btn-check" id={cow._id} unchecked autocomplete="off"></input>
                             <label className="btn btn-outline-success" for={cow._id}>{cow.name} {cow.tag}</label>
                             <br></br>
                        </div>
                    ))}
                 </div>    
                )}   
                   
        </div>
    )
}

export default function Attendance() {
    const location = useLocation()
    const { herdId, herdName } = location.state
    const [cattle, setCattle] = useState([])

    const getCattleData = async () => {
        const data = await getCows(herdId)
        setCattle(data)
    }

    useEffect(() => {
        getCattleData()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <h1 className="display display-4">{herdName}</h1>
                <Checklist cattle = {cattle} />
            </div>
        </>
    )
}