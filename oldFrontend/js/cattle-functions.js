const addCattle = (herdId) => { 
    //Defines variables and where they are targeted
    const nameCow = document.querySelector('#cow-name')
    const tagNum = document.querySelector('#tag-num')
    const newCow = document.querySelector('#add-cow')
    //const cattleChecker = document.querySelector('#cattle-checker')

    const cattleData = {
        name: 'Cow',
        tag: 0
    }

    //Captures the users input for the cows name
    nameCow.addEventListener('input', (e) =>{
        cattleData.name = e.target.value
    }) 

    //Captures the users input for the cows tag number
    tagNum.addEventListener('input', (e) =>{
        cattleData.tag = e.target.value
    })

    //Creates an object for the herd when the add cow button is clicked
    newCow.addEventListener('click', async (e) =>{
        e.preventDefault()

        const response = await fetch('http://localhost:3001/cattle', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: cattleData.name,
                tag: cattleData.tag,
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        
        location.reload()
    })  
}

const getCattle = async (herdId) => {
    const response = await fetch('http://localhost:3001/cattle/' + herdId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    console.log(data)

    return data
}