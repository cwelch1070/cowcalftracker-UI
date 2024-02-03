import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { getCows } from '../API-Requests/cattleAPI'
import Navbar from './NavBar'
import '../css/CattleCheckbox.css'

function Checklist({ cattle, getCheckedCattle }) {
    return (
        <div>
            {cattle.length > 0 && (
                <div>
                    {cattle.map((cow) => (
                        <div key={cow._id} className="form-check mb-2" >
                             <input type="checkbox" className="btn-check" id={cow._id} unchecked autocomplete="off" onClick={() => getCheckedCattle(cow._id)}></input>
                             <label className="btn btn-outline-success" id="cattle-check-box" for={cow._id}>{cow.name} {cow.tag}</label>
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
    const [checked, setChecked] = useState([])

    const getCattleData = async () => {
        const data = await getCows(herdId)
        setCattle(data)
    }

    const getCheckedCattle = (cowId) => {
        setChecked(cowId)
        console.log(checked)
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
                <Checklist cattle = {cattle} getCheckedCattle={getCheckedCattle}  />
            </div>
        </>
    )
}