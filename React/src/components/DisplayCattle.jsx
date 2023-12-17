import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { createCattle, updateCow, getCows, deleteCattle } from '../API-Requests/cattleAPI'
import { createCalf, getCalf } from '../API-Requests/calvesAPI'
import NavBar from './NavBar'
import '../css/DisplayCattle.css'

// Child Component || Displays to button to trigger modal to add a cow to the herd
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

/* BUG

    Need to send default values if value is not chosen when creating cow
*/

// Child Component || Modal that allows user to input information about cow they creating
function CreateCowModal({ getChanges }) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // State variables
    const [cowName, setCowName] = useState('')
    const [tag, setTag] = useState('')
    const [note, setNote] = useState('')

    const handleSave = async () => {
        try {
             // Function to send request to API to create cow
            await createCattle(cowName, tag, note, herdId)
            getChanges()

            // Rerenders pages to reflect changes
            // Basically call getCattle() to refresh the page
            // getCattle()
        } catch (error) {
            console.error(`Failed to create cow: ${error}`)
        }
       

        // Clear State after button click
        setCowName('')
        setTag('')
        setNote('')
    }
    
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
                                    <input className="form-control" type="text" placeholder="(Optional)" value={cowName} onChange={e => setCowName(e.target.value)}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" placeholder="#" value={tag} onChange={e => setTag(e.target.value)}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" placeholder="Notes" value={note} onChange={e => setNote(e.target.value)}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success" id="save-herd" onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Child Component || Displays modal for editing a cow
function EditCowModal({ currentCow, getChanges }) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // State Variables
    const [cowName, setCowName] = useState('')
    const [tag, setTag] = useState('')
    const [note, setNote] = useState('')
    
    // Calls the updateCow function to update the cow
    // then calls getCattle to rerender UI and clears the form
    const handleUpdate = async () => {
        /* 
            chatGPT provided buggy code. It recommened using the spread 
            operator to copy currentCow into a new array called updatedCow
            to remedy the issue with edit herd not functioning properly.
            This resulted in the original array not getting updated and when 
            another field was changed after a recent update the previously changed
            field would revert back to its original value.
        */

        // These if statements make sure that the value being passed in from state 
        // is not an empty string before updating the cow.
        if(cowName !== '') {
            currentCow.name = cowName
        } 

        if(tag !== '') {
            currentCow.tag = tag
        }

        if(note !== '') {
            currentCow.notes = note
        }

        try {
            // Calls function to send request to api to edit cow
            await updateCow(currentCow.name, currentCow.tag, currentCow.notes, herdId, currentCow._id)
            getChanges()
            // Get cattle from api to reflect changes in UI
            // getCattle()
        } catch (error) {
            console.error(`Failed to update cow: ${error}`)
        }

        // Reset state value
        setCowName('')
        setTag('')
        setNote('')
    }

    // Sets state object when name is input
    const handleNameChange = (e) => {  
        setCowName(e.target.value)  
    }

    // Sets state object when tag is input
    const handleTagChange = (e) => {
        setTag(e.target.value)   
    }

    // Sets state object when note is changes
    const handleNoteChange = (e) => {
        setNote(e.target.value)
    }

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
                                    <input className="form-control" type="text" id="herd-name" value={cowName} placeholder="(Optional)" onChange={handleNameChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" id="herd-name" value={tag} placeholder="#" onChange={handleTagChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" id="herd-name" value={note} placeholder="Notes" onChange={handleNoteChange}/>
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

// Child Compenent || Modal to add calves to cow
function AddCalfModal({ currentCow, getChanges}) {
    // State Variables
    const [calfName, setCalfName] = useState('')
    const [tag, setTag] = useState('')
    const [gender, setGender] = useState('')
    const [note, setNote] = useState('')
    
    // Calls the updateCow function to update the cow
    // then calls getCattle to rerender UI and clears the form
    const handleCalfCreate = async () => {
        console.log(currentCow._id)
        try {
            await createCalf(calfName, tag, gender, note, currentCow._id)
            getChanges()
        } catch (error) {
            console.error(`Failed to add calf: ${error}`)
        }

        // Reset state value
        setCalfName('')
        setTag('')
        setGender('')
        setNote('')
    }

    // Sets state object when name is input
    const handleNameChange = (e) => {  
        setCalfName(e.target.value)  
    }

    // Sets state object when tag is input
    const handleTagChange = (e) => {
        setTag(e.target.value)   
    }

    // Sets state object when note is changes
    const handleNoteChange = (e) => {
        setNote(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    return (
        <>
            <div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel4" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel4">Add Calf</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input className="form-control" type="text" value={calfName} placeholder="(Optional)" onChange={handleNameChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" value={tag} placeholder="#" onChange={handleTagChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Gender</span>
                                    <input className="form-control" type="text" value={gender} placeholder="Gender" onChange={handleGenderChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" value={note} placeholder="Notes" onChange={handleNoteChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success" id="save-herd" onClick={() => handleCalfCreate()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Child Component || Renders Card
function Card({ cattle, calf, passCurrentCowData, getChanges, getCurrentCalf }) {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()

    // Allows this component to use herdId like a state variable
    const { herdId } = location.state

    // Pass current cow id to parent to be used in edit herd and add calf component
    const currentCowData = (cowId) => {
        const currentCow = cattle.find(cow => cow._id === cowId)
        passCurrentCowData(currentCow)
    }

    // Calls function to delete the cow
    const handleDelete = async (cowId) => {
        // Calls function to send request to api to delete cow
        await deleteCattle(cowId, herdId)
        getChanges()
    }
    
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
                                            <button className='dropdown-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop4" onClick={() => currentCowData(cow._id)}>Add Calf</button>
                                            <button className='dropdown-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop3" onClick={() => currentCowData(cow._id)}>Edit</button>
                                            <button className='dropdown-item' onClick={() => handleDelete(cow._id)}>Delete</button>
                                        </ul>
                                    </div>
                                </div>
                                <p className="card-text">Tag: {cow.tag}</p>
                                <p className="card-text">Calves: {cow.calf}</p>
                                <p className='card-text'>Notes: {cow.notes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

// Parent Component || Called in dashboard component when rendered
export default function DisplayCattle() {
    // Works like local storage and allows this file to have acces to herdId from DisplayHerd.jsx
    const location = useLocation()
    // Allows this component to use herdId like a state variable
    const { herdId, herdName } = location.state

    // SETS THE STATE FOR THE CATTLE DATA
    const [cattle, setCattle] = useState([])
    const [calf, setCalf] = useState([])
    const [currentCow, setCurrentCow] = useState([])
    const [count, setCount] = useState(0)

    // Calls the function getCows to make request to api to get all cattle in db
    const getCattle = async () => {
        try {
            // GETS THE CATTLE DATA FROM API
            const data = await getCows(herdId)
            // Stores json data returned from getCows() in state
            setCattle(data)
        } catch (error) {
            console.error(`Could not get cattle: ${error}`)
        }
    }

    const getCurrentCalf = async () => { 
        const currentCalf = await getCalf(currentCow) 

        setCalf(currentCalf) 

        console.log(calf)
    }
    
    // Passes data of current cow selected by user
    const passCurrentCowData = (cow) => {
        setCurrentCow(cow)
    }

    const getChanges = () => {
        setCount(count + 1)
    }

    // Controls how often the function is called in each render 
    useEffect(() => {
        getCattle()
    }, [count]) 

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='container'>
                <h1 className='display display-4'>{herdName}</h1>
            </div>
            <div className='container'>
                <CreateCowButton 
                getChanges={getChanges} 

                />
            </div>
            <div>
                <CreateCowModal 
                getChanges={getChanges} 

                />
            </div>
            <div className='container'>
                <Card 
                cattle={cattle} 
                calf={calf}
                passCurrentCowData={passCurrentCowData}
                getChanges={getChanges}
                getCurrentCalf={getCurrentCalf}

                />
            </div>
            <div>
                <EditCowModal 
                cattle={cattle} 
                currentCow={currentCow} 
                getChanges={getChanges} 

                />
            </div>
            <div>
                <AddCalfModal
                currentCow={currentCow}
                getChanges={getChanges}
                />
            </div>
        </>
    )
}