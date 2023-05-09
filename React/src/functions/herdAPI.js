import { getToken } from '../auth/store-token'

// Get herd request to api
export const getHerd = async () => {
    const response = await fetch('http://45.58.52.73:81/herd', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'  
            }
        })
        
        // Store JSON returned from api
        const data = await response.json()

        // Return JSON from api
        return data
}

// Create herd request to api
export const createHerd = async (herdName) => {
    console.log(herdName)
    const response = await fetch('http://45.58.52.73:81/herd', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: herdName
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        const data = await response.json()
        console.log(data)
}

// Update herd request to api
export const editHerd = async (herdName, herdId) => {
    const response = await fetch('http://45.58.52.73:81/herd/' + herdId, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify({
                name: herdName
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        const data = await response.json()
        console.log(data)
}

// Delete herd from db
export const deleteHerd = async (herdId) => {
    const response = await fetch('http://45.58.52.73:81/herd/' + herdId, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
}