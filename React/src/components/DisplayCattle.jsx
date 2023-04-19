import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import '../css/DisplayCattle.css'

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

function CreateCowModal(props) {
    const location = useLocation()
    const { herdId } = location.state

    const [cowName, setCowName] = useState('Cow')
    const [tag, setTag] = useState(0)
    const [note, setNote] = useState('N/A')
    const createCowRequest = async (cowName, tag) => {
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
        props.getCattle()
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

function EditCowModal({ getCattle, cowId }) {
    const location = useLocation()
    const { herdId } = location.state

    const [cow, setCow] = useState({
        name: '',
        tag: 0,
        note: ''
    })

    /* 
        When the text box is being cleared every tiem back space is pressed it is 
        setting the name to that value including when it hits an empty string
        which triggers the else if but by then the state has already been set to an empty string
    */
    const handleNameChange = (e) => {
        //e.preventDefault()
        if(e.target.value !== '') {
            setCow({name: e.target.value})
        } 
    }

    const handleTagChange = (e) => {
        if(e.target.value !== 0) {
            setCow({tag: e.target.value})
        } 
    }

    const handleNoteChange = (e) => {
        if(e.target.value !== '') {
            setCow({note: e.target.value})
        } 
    }

    const editCowRequest = async (cowName, tag, note) => {
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

        //REFRESH UI
        getCattle()
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
                                    <input className="form-control" type="text" id="herd-name" placeholder="(Optional)" onChange={handleNameChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" id="herd-name" placeholder="#" onChange={handleTagChange}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Notes</span>
                                    <input className="form-control" type="text" id="herd-name" placeholder="Notes" onChange={handleNoteChange}/>
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
    const location = useLocation()
    const { herdId } = location.state

    const deleteCow = async (cowId) => {
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
                getCattle()
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

    //GETS THE STATE THAT IS PASSED FROM DISPLAYHERD
    const location = useLocation()
    const { herdId, herdName } = location.state

    //SETS THE STATE FOR THE CATTLE DATA
    const [cattle, setCattle] = useState([])

    //KEEPS TRACK OF THE CURRENTLY SELECTED COWS DATA
    const [cowId, setCowId] = useState('')

    //GETS THE CATTLE DATA FROM API
    const getCattle = useCallback(async () => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + herdId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        setCattle(data)
    },[herdId]) 

    //BASICALLY SETTER FUNCTIONS
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