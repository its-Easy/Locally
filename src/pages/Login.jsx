import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

//CSS
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    height: 50vh;
    background-color: white;
    font-size: 20px;
    margin-top: 10vh;
    margin-left: 25vw;
    margin-right: 25vw;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`
const Email = styled.div`
    margin-bottom: 2vh;
`
const Password = styled.div`
    margin-bottom: 5vh;
`
const Button = styled.div``


const Login = () => {
    const [user, setUser] = useState("")
    useEffect(async () => {
        const authToken = localStorage.getItem('token')
        const res = await axios.post('http://localhost:5000/auth/verify-token', { token: authToken })
        setUser(res.data)
    })

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        const response = await axios.post('http://localhost:5000/auth/login', { email: email, password: password })
            .then(res => {
                localStorage.setItem('token', res.data)
                alert("Logged in successfully")
                window.location.reload(); 
            })
            .catch(err => alert("Wrong Credentials"))
    }

    if (user) {
        console.log(user)
        return <Redirect to='/' />
    }
    else
        return (
            <div>
                <Container>
                    <Email>
                        Email: <br /> <input type="text" placeholder='Enter your E-mail' onChange={({ target }) => setEmail(target.value)}></input>
                    </Email>
                    <Password>
                        Password: <br /> <input type="password" placeholder='Enter your password' onChange={({ target }) => setPassword(target.value)}></input>
                    </Password>
                    <Button>
                        <button onClick={handleSubmit}>Log In</button>
                    </Button>
                </Container>
            </div>
        )
}

export default Login
