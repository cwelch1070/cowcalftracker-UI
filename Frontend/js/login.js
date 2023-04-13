const port = '45.58.52.73:81' || 'localhost:3001'

const loginUser = async () => {
    const res = await fetch('http://' + port + '/user/login', {
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

    if(res.status === 200) {
        location.href = './public/dashboard.html'
    }
}

const userEmail = document.querySelector('#user-email')
const userPass = document.querySelector('#user-pass')
const btn = document.querySelector('#login-btn')

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
    loginUser()
})