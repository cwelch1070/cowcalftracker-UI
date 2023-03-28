//GENERATES HTML ELEMENTS AND RENDERS HERD DATA IN THEM
const generateDOM = async () => {
    //Selects the main HTML div and creates a div for row
    const mainDiv = document.querySelector('#main')
    const confirmDeleteBtn = document.querySelector('#confirm-delete')

    const row = document.createElement('div')

    //Store the return of getHerdData in herData
    const herdData = await getHerdData()
    
    /*  
        This loops once for every item returned by getHerdData()
        and displays each herd in the DB as well as generating 
        all the needed html elements to display each piece of data
    */
    herdData.forEach((herd) => {
        //HTML elements 
        const col = document.createElement('div')
        const card = document.createElement('div')
        const cardBody = document.createElement('div')
        const btnGroup = document.createElement('div')
        const list = document.createElement('ul')
        const heading = document.createElement('h5')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')

        //MENU DOPDOWN
        const menuDropdown = document.createElement('button')
        menuDropdown.textContent = '. . .'

        //ADD CATTLE BUTTON HANDLER
        const addCattlebtn = document.createElement('button')
        addCattlebtn.textContent = 'Add Cattle'
        addCattlebtn.addEventListener('click', async (e) => {
            addCattle(herd._id)
        })

        //VIEW CATTLE BUTTON HANDLER
        const editCattleBtn = document.createElement('button')
        editCattleBtn.textContent = 'Edit Cattle'
        editCattleBtn.addEventListener('click', (e) => {
            clearHTML()
            displayCattle(herd._id)
        })

        const rollCallBtn = document.createElement('button')
        rollCallBtn.textContent = 'Roll Call'
        rollCallBtn.addEventListener('click', (e) => {
            clearHTML()
            displayRollCall(herd._id)
        })
       
        //DELTE HERD AND CATTLE
        const deleteHerd = document.createElement('button')
        deleteHerd.textContent = 'Delete Herd'
        deleteHerd.addEventListener('click', (e) => {
            confirmDeleteBtn.addEventListener('click', async (e) => {
                const response = await fetch('http://' + port + '/herd/' + herd._id, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Authorization': getToken(),
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()
                console.log(data)

                //Keeping page refresh after delete 
                //There is currently no reason to not refresh after a delete
                location.reload()
            })
        })
        
        //Define textNodes to hold herd data
        let textNode1
        let textNode2
        let textNode3

        //Pass herd info to textNode
        textNode1 = document.createTextNode(herd.name)
        textNode2 = document.createTextNode(herd.numOfCattle)
        textNode3 = document.createTextNode(`Updated: ${herd.dateCreated}`)
        
        //Appends each element to the other
        heading.appendChild(textNode1)
        p1.appendChild(textNode2)
        p2.appendChild(textNode3)

        cardBody.appendChild(heading)
        cardBody.appendChild(p1)
        cardBody.appendChild(p2)
        heading.appendChild(btnGroup)
        btnGroup.appendChild(menuDropdown)
        btnGroup.appendChild(list)
        list.appendChild(addCattlebtn)
        list.appendChild(editCattleBtn)
        list.appendChild(rollCallBtn)
        list.appendChild(deleteHerd)

        card.appendChild(cardBody)

        col.appendChild(card)

        row.appendChild(col)

        //Adds needed bootstrap to each element
        row.className = 'row'
        col.className = 'col-sm-6'
        card.className = 'card border-success mt-1'
        cardBody.className = 'card-body'

        //Button group bootstrap
        btnGroup.className = 'btn-group'

        //Menu dropdown button boostrap
        menuDropdown.className = 'btn dropdown-toggle'
        menuDropdown.type = 'button'
        menuDropdown.dataset.bsToggle = 'dropdown'

        //Unordered List bootstrap
        list.className = 'dropdown-menu'

        //Bootstrap needed to generate modal when button is clicked
        addCattlebtn.className = 'dropdown-item btn btn-success'
        addCattlebtn.type = 'button'
        addCattlebtn.dataset.bsToggle = 'modal'
        addCattlebtn.dataset.bsTarget = '#staticBackdrop2' 

        editCattleBtn.className = 'dropdown-item btn btn-warning'
        editCattleBtn.type = 'button'
        editCattleBtn.dataset.bsToggle = 'modal'
        editCattleBtn.dataset.bsTarget = '#staticBackdrop3'

        rollCallBtn.className = 'dropdown-item btn btn-primary'
        rollCallBtn.type = 'button'
        rollCallBtn.dataset.bsToggle = 'modal'
        rollCallBtn.dataset.bsTarget = '#staticBackdrop4'

        deleteHerd.className = 'dropdown-item btn btn-danger'
        deleteHerd.type = 'button'
        deleteHerd.dataset.bsToggle = 'modal'
        deleteHerd.dataset.bsTarget = '#staticBackdrop5'

        heading.className = 'card-title d-flex justify-content-between'
        p1.className = 'card-text'
        p2.className = 'card-text'

    })
    
    mainDiv.appendChild(row)
}
