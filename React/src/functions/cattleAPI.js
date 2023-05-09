// Makes request to server to create a cow
export const createCattle = async (cowName, tag, note, herdId) => {
    const response = await fetch('http://45.58.52.73:81/cattle', {
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

        const data = await response.json()
        console.log(data)
}

export const getCattle = async (herdId) => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + herdId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        return data
}

export const editCattle = async (cowName, tag, note, herdId, cowId) => {
    const response = await fetch('http://45.58.52.73:81/cattle/' + cowId, {
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
        const data = await response.json() 
        console.log(data)
}

export const deleteCattle = async (cowId, herdId) => {
    const response = await fetch('http://45.58.52.73:81/cattle/' + cowId, {
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify({
                        herdId: herdId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()
                console.log(data)
}