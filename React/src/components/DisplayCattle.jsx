export default DisplayCattle = () => {
    const [cattle, setCattle] = useState([])

    const getCattle = async () => {
    const res = await fetch('http://45.58.52.73:81/cattle/642dd0b2d38643aa5d085329', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        console.log(data)
        
        setCattle(data)
    }

    useEffect(() => {
        getCattle()
    }, [])

    return (
        <div>
            {cattle.length > 0 && (
                <ul>
                    {cattle.map(cow => (
                        <li key={cow._id}>{cow.tag + ' ' + cow.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}