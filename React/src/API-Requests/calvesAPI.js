const api = process.env.REACT_APP_API

// Create Calf
export const createCalf = async (calfName, tag, gender, note, dam) => {
    const res = await fetch(`${api}/calves`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            name: calfName,
            tag: tag,
            gender: gender,
            notes: note,
            dam: dam
            // birthDate: calfBirthDate
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    return 'Created'
}

// Get calf by dam Id
export const getCalf = async (dam) => {
    const res = await fetch(`${api}/calves/${dam}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()
    
    return data
}

// Update Calf

// Delete Calf