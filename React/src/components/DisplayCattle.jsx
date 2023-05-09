import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { createCattle, editCattle, getCattle, deleteCattle } from '../functions/cattleAPI'
import NavBar from './NavBar'
import '../css/DisplayCattle.css'

// Displays to button to trigger modal to add a cow to the herd
function CreateCowButton() {
    return (
        <>
            {/* This button triggers the modal for naming the herd */}
            <div>
                <button
                id="create-cow-btn"
                type="button"
                className="btn btn-primary mt-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
                >Create New Cow</button>
            </div>
        </>
    )
}

// Modal that allows user to input information about cow they creating
function CreateCowModal(props) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // State variables
    const [cowName, setCowName] = useState('Cow')
    const [tag, setTag] = useState('')
    const [note, setNote] = useState('N/A')

    // Function to send request to API to create cow
    createCattle(cowName, tag, note, herdId)

    // Rerenders pages to reflect changes
    // Basically call getCattle() to refresh the page
    props.getCattle()

    return (
        <>
            {/* The bellow html creates the modal and the form that is used to create and name a herd */}
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel1">Create New Cow</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input className="form-control" type="text" placeholder="(Optional)" onChange={e => setCowName(e.target.value)}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" placeholder="#" onChange={e => setTag(e.target.value)}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" placeholder="Notes" onChange={e => setNote(e.target.value)}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success" id="save-herd" onClick={() => createCowRequest(cowName, tag)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/* TODO 

    Find a better way to get state in this component

*/
// Displays modal for editing a cow
function EditCowModal({ getCattle, cowId }) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // Object stored in state to get info of cattle
    const [cow, setCow] = useState({
        name: '',
        tag: '',
        note: ''
    })

    // Sets state object when name is input
    const handleNameChange = (e) => {
        setCow({name: e.target.value})
    }

    // Sets state object when tag is input
    const handleTagChange = (e) => {
        setCow({tag: e.target.value})
    }

    // Sets state object when note is changes
    const handleNoteChange = (e) => {
        setCow({note: e.target.value})
    }

    // Calls function to send request to api to edit cow
    editCattle(cowName, tag, note, herdId, cowId)

    // Get cattle from api to reflect changes in UI
    getCattle()

    // Reset values of state
    setCow({
        name: '', 
        tag: '',
        note: ''
    })

    return (
        <>
            <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel3">Edit Cow</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input className="form-control" type="text" id="herd-name" value={cow.name} placeholder="(Optional)" onChange={handleNameChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" id="herd-name" value={cow.tag} placeholder="#" onChange={handleTagChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" id="herd-name" value={cow.note} placeholder="Notes" onChange={handleNoteChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success" id="save-herd" onClick={() => editCowRequest(cow.name, cow.tag, cow.note)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Card({ cattle, getCattle, passCurrentCowId }) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // Calls function to send request to api to delete cow
    deleteCattle(cowId, herdId)

    // Calls getCattle to reflect changes in UI
    getCattle()

    return (
        <>
            {cattle.length > 0 && (
                <div>
                    {cattle.map(cow => (
                        <div key={cow._id} className="card mb-2 mt-2">
                            <div className="card-body" id='herd-card'>
                                <div id='title-group'>
                                    <h5 className="card-title mb-3" id='herd-name'>{cow.name}</h5>
                                    <div className='dropdown'>
                                        <button id='options-btn' className='btn dropdown-toggle' type='button' data-bs-toggle='dropdown'>. . .</button>
                                        <ul className='dropdown-menu'>
                                            <button className='dropdown-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop3" onClick={() => passCurrentCowId(cow._id)}>Edit</button>
                                            <button className='dropdown-item' onClick={() => deleteCow(cow._id)}>Delete</button>
                                        </ul>
                                    </div>
                                </div>
                                <p className="card-text">Tag: {cow.tag}</p>
                                <p className='card-text'>Notes: {cow.notes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default function DisplayCattle() {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // SETS THE STATE FOR THE CATTLE DATA
    const [cattle, setCattle] = useState([])

    // KEEPS TRACK OF THE CURRENTLY SELECTED COWS DATA
    const [cowId, setCowId] = useState('')

    const callGetCattle = async () => {
        // GETS THE CATTLE DATA FROM API
        const data = await getCattle(herdId)
        setCattle(data)
    }
    
    // Gets the cowId from the cow that is clicked and sets it in state
    const passCurrentCowId = (currentCowId) => {
        setCowId(currentCowId)
    }

    useEffect(() => {
        getCattle()
    }, [getCattle]) 

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='container'>
                <h1 className='display display-4'>{herdName}</h1>
            </div>
            <div className='container'>
                <CreateCowButton />
            </div>
            <div>
                <CreateCowModal getCattle={getCattle}/>
            </div>
            <div className='container'>
                <Card 
                cattle={cattle} 
                getCattle={getCattle} 
                passCurrentCowId={passCurrentCowId}
                />
            </div>
            <div>
                <EditCowModal getCattle={getCattle} cowId={cowId} />
            </div>
        </>
    )
}