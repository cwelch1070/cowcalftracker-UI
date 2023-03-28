//Displays the cattle ONLY to the DOM
const displayCattle = async (herdId) => {
    const headers = ['Tag #', 'Cow Name']

    const displayCows = document.querySelector('#display-cattle')

    let table = document.querySelector('#table1')
    let tbody = document.createElement('tbody')
    let headerRow = document.createElement('tr')

    headers.forEach((headerText2) => {
        let header = document.createElement('th')
        let text = document.createTextNode(headerText2)

        header.appendChild(text)
        headerRow.appendChild(header)
    })
    
    table.appendChild(headerRow)
    
    const cattleData = await getCattle(herdId)

    cattleData.forEach((cattle) => {
        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'
        removeBtn.className = 'btn btn-danger'
        removeBtn.addEventListener('click', async () => {
            removeCow(cattle._id, herdId)
        })
        
        let textNode1
        let textNode2

        textNode1 = document.createTextNode(cattle.name)
        textNode2 = document.createTextNode(cattle.tag) 

        cell.appendChild(textNode1)
        cell2.appendChild(textNode2)
        cell3.appendChild(removeBtn)

        row.appendChild(cell2)
        row.appendChild(cell)
        row.appendChild(cell3)

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}