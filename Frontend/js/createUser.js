const port = '45.58.52.73:81' || 'localhost:3001'

const createUser = async () => {
    const res = await fetch('http://' + port + '/user/create', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email: userData.email,
            password: userData.password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()
    const token = data.token

    setToken(token)
    
    if(res.status === 201) {
        location.href = './dashboard.html'
    }
}

const userEmail = document.querySelector('#user-email')
const userPass = document.querySelector('#user-pass')
const btn = document.querySelector('#create-btn')

const userData = {
    email: '',
    password: ''
}

userEmail.addEventListener('input', (e) => {
    userData.email = e.target.value
})

userPass.addEventListener('input', (e) => {
    userData.password = e.target.value
})

btn.addEventListener('click', (e) => {
    createUser()
})