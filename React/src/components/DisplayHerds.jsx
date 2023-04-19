import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../auth/store-token'
import '../css/DisplayHerds.css'

function HerdCreatedAlert() {
    return (
        <div className="alert alert-success" role="alert">
            Herd has been saved.
        </div>
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

function CreateHerdModal(props) {
    const [herdName, setHerdName] = useState('Herd')
    const createHerdRequest = async (herdName) => {
        const response = await fetch('http://45.58.52.73:81/herd', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: herdName
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        const data = await response.json()
        console.log(data)

        props.getHerdData()
        
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
                aria-hidden="true"
            >
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel1">Create New Herd</h1>
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
                        <input className="form-control" type="text" id="herd-name" placeholder="Name Herd" onChange={e => setHerdName(e.target.value)}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-success" id="save-herd" onClick={() => createHerdRequest(herdName)}>Save</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

function EditHerdModal(props) {
    const [herdName, setHerdName] = useState('Herd')
    const createHerdRequest = async (herdName) => {
        const response = await fetch('http://localhost:3001/herd/' + props.herdId, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify({
                name: herdName
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        const data = await response.json()
        console.log(data)
        props.getHerdData()
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
                        <input className="form-control" type="text" id="herd-name" placeholder="Rename Herd" onChange={e => setHerdName(e.target.value)}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-success" id="save-herd" onClick={() => createHerdRequest(herdName)}>Update</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

function Card(props) {
    const deleteHerd = async (herdId) => {
        const response = await fetch('http://45.58.52.73:81/herd/' + herdId, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Authorization': getToken(),
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()
                console.log(data)
                props.getHerdData()
    }

    return (
        <>
            {props.herds.length > 0 && (
                <div>
                    {props.herds.map(herd => (
                        <div key={herd._id} className="card mb-2 mt-2">
                            <div className="card-body" id='herd-card'>
                                <div id='title-group'>
                                    <h5 className="card-title mb-3" id='herd-name'>{herd.name}</h5>
                                    <div className='dropdown'>
                                        <button id='options-btn' className='btn dropdown-toggle' type='button' data-bs-toggle='dropdown'>. . .</button>
                                        <ul className='dropdown-menu'>
                                            <Link to='/Cattle' state={{herdId: herd._id, herdName: herd.name}} className='dropdown-item'>Cattle</Link>
                                            <button className='dropdown-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => props.getCurrentHerdId(herd._id)}>Edit Herd</button>
                                            <button className='dropdown-item' onClick={() => deleteHerd(herd._id)}>Delete Herd</button>
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
    //KEEPS TRACK OF WHAT HERD IS CURRENTLY SELECTED
    const [herdId, setHerdId] = useState('')
    //STORES AND KEEPS TRACK OF ALL HERD DATA OF HERD THAT IS CURRENTLY SELECTED
    const [herds, setHerds] = useState([])
    //SENDS FETCH REQUEST TO SERVER TO GET ALL HERD DATA
    const getHerdData = async () => {
        const response = await fetch('http://45.58.52.73:81/herd', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'  
            }
        })
    
        const data = await response.json()
        setHerds(data)
    }
    //SETS THE HERDID OF THE CURRENTLY SELECTED HERD
    const passCurrentHerdId = (curretnHerdId) => {
        setHerdId(curretnHerdId)
    }

    /* 
        The useEffect hook allows the dashboard to continue to updated 
        without having to refresh the page. It does this by allowing a
        continuous connection to the API making updating the UI seamless.
    */
    useEffect(() => {
        getHerdData()
    }, [])

    return (
        <>
            <h1 className="display display-4">Available Herds</h1>
            <CreateHerdButton />
            <Card herds={herds} getCurrentHerdId={passCurrentHerdId} getHerdData={getHerdData}  />
            <CreateHerdModal getHerdData={getHerdData} />
            <EditHerdModal herdId={herdId} getHerdData={getHerdData}/>
        </>
    )
}