import react, { useEffect, useState } from 'react'
import { getToken } from '../auth/store-token'

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

function CreateHerdModal() {
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
                    <h1 className="modal-title fs-5" id="staticBackdropLabel1">
                        Create New Herd
                    </h1>
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
                        <input
                            className="form-control"
                            type="text"
                            id="herd-name"
                            placeholder="Name Herd"
                        />
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success" id="save-herd">
                        Save
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

function Card() {
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
            {herds.length > 0 && (
                <div>
                    {herds.map(herd => (
                        <div key={herd._id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{herd.name}</h5>
                                <p className="card-text">Cattle: {herd.numOfCattle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default function DisplayHerds() {

    return (
        <>
            <h1 className="display display-4">Available Herds</h1>
            <CreateHerdButton />
            <Card />
            <CreateHerdModal />
        </>
    )
}