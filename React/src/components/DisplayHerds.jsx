import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHerd, editHerd, createHerd, deleteHerd } from '../API-Requests/herdAPI'
import '../css/DisplayHerds.css'

function HerdCreatedAlert({ alert }) {
    return (
        <>
            {alert && (
                <div className="alert alert-success" role="alert">
                    Herd Succesfully Created
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div> 
            )}
        </>    
    )
}

function HerdNotCreatedAlert() {
    return (
        <div className="alert alert-danger" role="alert">
            A problem occured Creating the herd.
        </div>
    )
}

function HerdDeletedAlert() {
        <div className="alert alert-danger" role="alert">
            Herd has been deleted.
        </div>
}

function CreateHerdButton() {
    return (
        <>
            {/* This button triggers the modal for naming the herd */}
            <div>
                <button
                id="create-herd-btn"
                type="button"
                className="btn btn-primary mt-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
                >
                Create New Herd
                </button>
            </div>
        </>
    )
}

function CreateHerdModal({ getHerdData, getChanges }) {
    // State Variable
    const [herdName, setHerdName] = useState('')
    const [alert, setAlert] = useState('')

    // Handles submit button click
    const handleSave = async () => {
        try {
            // Calls function to send request to api to create herd
            const data = await createHerd(herdName)
            setAlert(data)

            // Update UI
            getChanges()

            // Clears the text boxs after click
            setHerdName('')
        } catch (error) {
            console.error(`Could not create herd: ${error}`)
        }
    }

    const handleClose = () => {
        setAlert('')
    }

    const handleHerdName = (e) => {
        setHerdName(e.target.value)
    }
   
    return (
        <>
            {/* The bellow html creates the modal and the form that is used to create and name a herd */}
            <div
                className="modal fade"
                id="staticBackdrop1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel1"
                aria-hidden="true">
                <div className='container w'>
                   <HerdCreatedAlert alert={alert} /> 
                </div>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel1">Create New Herd</h1>
                            <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group">
                                <span className="input-group-text">Name</span>
                                <input className="form-control" type="text" id="herd-name" placeholder="Name Herd" value={herdName} onChange={handleHerdName}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleClose} >Cancel</button>
                            <button type="submit" className="btn btn-success" id="save-herd" onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
}

function EditHerdModal({ herdId, getChanges, herds }) {
    // Stores herdName
    const [herdName, setHerdName] = useState('')

    // Calls functions when Update button is clicked
    const handleUpdate = async () => {
        const currentHerd = herds.find((herds) => herds._id === herdId)
        if(herdName !== '') {
            currentHerd.name = herdName
        }

        try {
            // Calls function to send request to api
            await editHerd(currentHerd.name, herdId)

            // Update UI
            getChanges()

            // Clear value
            setHerdName('')
        } catch (error) {
            console.error(`Failed to update: ${error}`)
        }
    }

    // Handle the changes of the herd name
    const handleNameChange = (e) => {
        setHerdName(e.target.value)
    }
    
    return (
        <>
            <div
                className="modal fade"
                id="staticBackdrop2"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel2"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel2">Edit Herd</h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="input-group">
                            <span className="input-group-text">Name</span>
                            <input className="form-control" type="text" id="herd-name" placeholder="Rename Herd" value={herdName} onChange={handleNameChange}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-success" id="save-herd" onClick={() => handleUpdate()}>Update</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

function Card({ getHerdData, herds, getCurrentHerdId, getChanges }) {
    const handleDelete = async (herdId) => {
        try {
            // Call delete function
            deleteHerd(herdId)

            // Update UI
            getChanges()
        } catch (error) {
            console.error(`Failed to delete: ${error}`)
        }     
    }

    return (
        <>
            {herds.length > 0 && (
                <div>
                    {herds.map(herd => (
                        <div key={herd._id} className="card mb-2 mt-2">
                            <div className="card-body" id='herd-card'>
                                <div id='title-group'>
                                    <h5 className="card-title mb-3" id='herd-name'>{herd.name}</h5>
                                    <div className='dropdown'>
                                        <button id='options-btn' className='btn dropdown-toggle' type='button' data-bs-toggle='dropdown'>. . .</button>
                                        <ul className='dropdown-menu'>
                                            <Link to='/Cattle' state={{herdId: herd._id, herdName: herd.name}} className='dropdown-item'>Cattle</Link>
                                            <button className='dropdown-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => getCurrentHerdId(herd._id)}>Edit Herd</button>
                                            <button className='dropdown-item' onClick={() => handleDelete(herd._id)}>Delete Herd</button>
                                        </ul>
                                    </div>
                                </div>
                                <p className="card-text">Cattle: {herd.numOfCattle}</p>
                                <p className='card-text'>Created: {herd.dateCreated}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default function DisplayHerds() {
    // KEEPS TRACK OF WHAT HERD IS CURRENTLY SELECTED
    const [herdId, setHerdId] = useState('')
    // STORES AND KEEPS TRACK OF ALL HERD DATA OF HERD THAT IS CURRENTLY SELECTED
    const [herds, setHerds] = useState([])
    const [count, setCount] = useState(0)
    // SENDS FETCH REQUEST TO SERVER TO GET ALL HERD DATA
    const getHerdData = async () => {
        const data = await getHerd()
        setHerds(data)
    }
    // SETS THE HERDID OF THE CURRENTLY SELECTED HERD
    const passCurrentHerdId = (curretnHerdId) => {
        setHerdId(curretnHerdId)
    }

    const getChanges = () => {
        setCount(count + 1)
    }

    /* 
        The useEffect hook allows the dashboard to continue to updated 
        without having to refresh the page. It does this by allowing a
        continuous connection to the API making updating the UI seamless.
    */
    useEffect(() => {
        getHerdData()
    }, [count])

    return (
        <div className='container'>
            <h1 className="display display-4">Available Herds</h1>
            <CreateHerdButton />
            <Card 
            herds={herds} 
            getCurrentHerdId={passCurrentHerdId}  
            getChanges={getChanges}
            />
            <CreateHerdModal  
            getChanges={getChanges}
            herds={herds}
            />
            <EditHerdModal 
            herdId={herdId} 
            getChanges={getChanges}
            herds={herds}
            />
        </div>
    )
}