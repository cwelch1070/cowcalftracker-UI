// Makes request to server to create a cow
export const createCattle = async (cowName, tag, note, herdId) => {
    const res = await fetch('http://45.58.52.73:81/cattle', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: cowName,
                tag: tag,
                notes: note,
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Gets return from api
        const data = await res.json()
        console.log(data)
}

// Gets all cattle from db
export const getCows = async (herdId) => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + herdId, {
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

// Updates existing cow in db
export const updateCow = async (cowName, tag, note, herdId, cowId) => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + cowId, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify({
                name: cowName,
                tag: tag,
                notes: note,
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Gets return from api
        const data = await res.json() 
        console.log(data)
}

// Delete Cow from db
export const deleteCattle = async (cowId, herdId) => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + cowId, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify({
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // Gets return from api
        const data = await res.json()
        // Logs to console
        console.log(data)
}