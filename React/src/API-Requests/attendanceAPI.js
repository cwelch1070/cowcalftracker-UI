const api = process.env.REACT_APP_API

export const submitAttendance = async (attendance) => {
    const res = await fetch(`${api}/attendance`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            record: attendance,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    return data
}

export const getAttendanceRecords = async (herdId) => {
    const res = await fetch(`${api}/attendance/${herdId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // Gets return from api
    const data = await res.json()
    
    // Returns json data to be used in component
    return data
}