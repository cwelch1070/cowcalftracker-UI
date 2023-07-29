const api = process.env.REACT_APP_API

// Create Calf
export const createCalf = async (calfName, tag, note, dam) => {
    const res = await fetch(`${api}/calves`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            name: calfName,
            tag: tag,
            notes: note,
            dam: dam
            // birthDate: calfBirthDate
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    console.log(data)

    return 'Created'
}

// Get calf by Id

// Update Calf

// Delete Calf