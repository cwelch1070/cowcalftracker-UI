import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getHerd } from "../API-Requests/herdAPI"

function Dropdown({ herds }) {
    return (
      <>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Attendance
          </a>
          <ul class="dropdown-menu">
            {herds.length > 0 && (
              <div>
                {herds.map((herd) => (
                  <div key={herd._id}>
                    <li>
                      <Link
                        to="/Attendance"
                        state={{ herdId: herd._id, herdName: herd.name }}
                        className="dropdown-item"
                      >
                        {herd.name}
                      </Link>
                    </li>
                  </div>
                ))}
              </div>
            )}
          </ul>
        </li>
      </>
    );
}

export default function NavBar() {
    const [herds, setHerds] = useState([])

    const getHerdData = async () => {
        const data = await getHerd()
        setHerds(data)
    }           

    useEffect(() => {
       getHerdData()
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/Dashboard'}>CowCalfTracker</Link>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                ><span className="navbar-toggler-icon" /> 
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/cwelch1070/cowcalftracker">Github</a>
                    </li>
                    <Dropdown herds = {herds}/>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search Cattle" aria-label="Search"/>
                    <button className="btn btn-outline-dark" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
    )
}