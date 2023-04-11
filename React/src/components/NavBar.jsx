//This is a react component
export default function NavBar() {
    return (
        <div className='nav-bar-container'>
            <div className='logo'>
                <p>CowCalfTracker</p>
            </div>
            <div className='search-bar'>
                <input placeholder='Search'/>
            </div>
        </div>
    )
}