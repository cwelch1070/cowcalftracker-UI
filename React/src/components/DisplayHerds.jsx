import react, { useEffect, useState } from 'react'
import { getToken } from '../auth/store-token'
import '../css/DisplayHerds.css'

function Alert() {
    return (
        <div className="alert alert-success" role="alert">
            Herd has been saved.
        </div>
    )
}

function CreateHerdButton() {
    return (
        <>
            {/* This button triggers the modal for naming the herd */}
            <div id="create-herd-div">
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
    const [herdName, setHerdName] = useState('')
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

function Card({herds}) {
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
                                            <li className='dropdown-item'>Cattle</li>
                                            <li className='dropdown-item'>Delete Herd</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="card-text">Cattle: {herd.numOfCattle}</p>
                                <p className='card-text'>Last Checked: {herd.dateCreated}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default function DisplayHerds() {

    const [herds, setHerds] = useState([])
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
        console.log(data)
        setHerds(data)
    }

    useEffect(() => {
        getHerdData()
    }, [])

    return (
        <>
            <h1 className="display display-4">Available Herds</h1>
            <CreateHerdButton />
            <Card herds={herds}  />
            <CreateHerdModal getHerdData={getHerdData} />
        </>
    )
}