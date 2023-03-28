//Displays the cattle ONLY to the DOM
const displayRollCall = async (herdId) => {
    const headers = ['Tag #', 'Cow Name']

    const displayCows = document.querySelector('#roll-call')

    let table = document.querySelector('#table2')
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

    cattleData.forEach((cow) => {

        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')

        const checkBox = document.createElement('input')
        checkBox.className = 'form-check-input mt-0'
        checkBox.type = 'checkbox'
        checkBox.style.width = '25px'
        checkBox.style.height = '25px'
        checkBox.style.marginRight = '10px'

        let textNode1
        let textNode2

        textNode1 = document.createTextNode(cow.name)
        textNode2 = document.createTextNode(cow.tag) 

        cell.appendChild(textNode1)
        cell2.appendChild(checkBox)
        cell2.appendChild(textNode2)

        row.appendChild(cell2)
        row.appendChild(cell)
        row.appendChild(cell3)
    

        tbody.appendChild(row)
        table.appendChild(tbody)
    })

    displayCows.appendChild(table)
}