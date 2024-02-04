const api = process.env.REACT_APP_API

export const submitAttendance = async (attendance) => {
    // const res = await fetch(`${api}/attendance`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     body: JSON.stringify({
    //         record: attendance,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })

    // const data = await res.json()

    // return data

    console.log(attendance)
    console.log('submitAttendance was triggered')
}