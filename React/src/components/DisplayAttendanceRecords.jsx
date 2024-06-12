import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import { getAttendanceRecords } from "../API-Requests/attendanceAPI";
import NavBar from "./NavBar";

function Card({ records }) {
    return (
        <>
            {records.length > 0 && (
                <div>
                    {records.map(record => (
                        <div key={record._id} className="card mb-2 mt-2">
                            <div className="card-body" id='herd-card'>
                                <div id='title-group'>
                                    <h5 className="card-title mb-3" id='herd-name'>{record.cowName}</h5>
                                </div>
                                <p className="card-text">Tag: {record.tag}</p>
                                <p className="card-text">Status: {record.accountedFor ? 'Present' : 'Missing'}</p>
                                <p className='card-text'>Accounted for on: {record.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default function DisplayAttendanceRecords() {
    const location = useLocation()
    const { herdId, herdName } = location.state
    const [records, setRecords] = useState([]) 

    const getRecords = async () => {
        const results = await getAttendanceRecords(herdId)
        setRecords(results)
    }

    useEffect(() => {
        getRecords()
    }, [])

    return (
        <>
        <div>
             <NavBar />
        </div>
        <div className="container">
            <h1 className="display display-4">{herdName} Attendance Records</h1>
            <Card records = {records} />
        </div>
        </>
    )
}