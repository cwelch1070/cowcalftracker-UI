// setToken function to authenticate the current session
import { setToken } from '../auth/store-token';

// Get api path from .env
const api = process.env.REACT_APP_API

// Sends request to server to login user
export const login = async (email, password) => {
    const res = await fetch('https://www.cowcalftracker.com/api/user/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // Gets the json data returned from the server
    const data = await res.json()

    // Extracts the token from the json data 
    const token = data.token

    // Sets the token for the current session
    setToken(token)

    // Returns status of request to component
    return res.status
}

// sends request to server to create user
export const createUser = async (email, password) => {
    const res = await fetch(`${api}/user/create`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }  
        })

        // Gets json returned from server
        const data = await res.json()

        // Extracts the token from the json data and sets it to the current session
        setToken(data.token)

        // Returns status of request to component to know if they can be logged in or not
        return res.status
}