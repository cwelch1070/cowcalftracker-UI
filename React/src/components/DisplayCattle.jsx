import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import '../css/DisplayCattle.css'

function CreateCowButton() {
    return (
        <>
            {/* This button triggers the modal for naming the herd */}
            <div id="create-herd-div">
                <button
                id="create-cow-btn"
                type="button"
                className="btn btn-primary mt-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
                >
                Create New Cow
                </button>
            </div>
        </>
    )
}

function CreateCowModal(props) {
    const location = useLocation()
    const { herdId } = location.state

    const [cowName, setCowName] = useState('Cow')
    const [tag, setTag] = useState(0)
    const createCowRequest = async (cowName, tag) => {
        const response = await fetch('http://45.58.52.73:81/cattle', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: cowName,
                tag: tag,
                herdId: herdId
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
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
                                    <input className="form-control" type="text" id="herd-name" placeholder="(Optional)" onChange={e => setCowName(e.target.value)}/>
                                </div>
                                <div className='input-group mt-2'>
                                    <span className="input-group-text">Tag</span>
                                    <input className="form-control" type="text" id="herd-name" placeholder="#" onChange={e => setTag(e.target.value)}/>
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

function Card({cattle}) {
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
                                            <li className='dropdown-item'>Edit</li>
                                            <li className='dropdown-item'>Delete Cow</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="card-text">Tag: {cow.tag}</p>
                                <p className='card-text'>Description: Add ability to have a description or note.</p>
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

    //GETS THE CATTLE DATA FROM API
    const getCattle = async () => {
    const res = await fetch('http://45.58.52.73:81/cattle/' + herdId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        
        setCattle(data)
    }

    useEffect(() => {
        getCattle()
    }, [])

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
                <Card cattle={cattle}/>
            </div>
        </>
    )
}