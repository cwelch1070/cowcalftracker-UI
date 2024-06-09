import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import { getCows } from '../API-Requests/cattleAPI'
import { submitAttendance } from '../API-Requests/attendanceAPI'
import Navbar from './NavBar'
import '../css/CattleCheckbox.css'

function Checklist({ cattle, getCheckedCattle }) {
    return (
        <div>
            {cattle.length > 0 && (
                <div>
                    {cattle.map((cow) => (
                        <div key={cow._id} className="form-check mb-2" >
                             <input type="checkbox" className="btn-check" id={cow._id} unchecked="true" autoComplete="off" onClick={() => getCheckedCattle(cow._id, cow.herd)}></input>
                             <label className="btn btn-outline-success" id="cattle-check-box" htmlFor={cow._id}>{cow.name} {cow.tag}</label>
                             <br></br>
                        </div>
                    ))}
                 </div>    
                )}   
        </div>
    )
}

function SubmitButton({ handleSave, herdId, herdName }) {
    return (
        <div id="save-btn-div">
            <Link type="submit" className="btn btn-primary" id="save-btn" to='/Records' state={{ herdId: herdId, herdName: herdName }} onClick={() => handleSave()}>Save</Link>
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

    const getCheckedCattle = (cowId, herdId) => {
        setChecked([...checked, { cowId: cowId, herdId: herdId }])
    }

    const handleSave = async () => {
        await submitAttendance(checked)
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
                <SubmitButton handleSave = {handleSave} herdId = {herdId} herdName = {herdName} />
            </div>
        </>
    )
}