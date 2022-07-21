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
const Name = styled.div`
    margin-bottom: 2vh;
`
const Contact = styled.div`
    margin-bottom: 2vh;
`
const Email = styled.div`
    margin-bottom: 2vh;
`
const Password = styled.div`
    margin-bottom: 5vh;
`
const Button = {
    backgroundColor: "black",
    color: "white",
    fontSize: "20px",
    padding: "5px"
}


const Register = () => {
    const [user, setUser] = useState("")
    useEffect(async () => {
        //validate authentication token if present
        const authToken = localStorage.getItem('token')
        const res = await axios.post('http://localhost:5000/auth/verify-token', { token: authToken })
        setUser(res.data)
    })
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        const user = {
            name: name,
            email: email,
            contact: contact,
            password: password
        }
        console.log(user)
        const response = await axios.post('http://localhost:5000/auth/register', user)
            .then(res => {
                localStorage.setItem('token', res.data)
                alert("Registered successfully")
                window.location.reload(); 
            })
            .catch(err => console.log(err))
    }

    if (user) {
        return <Redirect to='/' />
    }
    else
        return (
            <div>
                <Container>
                    <Name>
                        Name: <br /> <input type="text" onChange={({ target }) => setName(target.value)} style={{ width: "20vw" }} placeholder='Enter your Name'></input>
                    </Name>
                    <Email>
                        Email: <br /> <input type="email" onChange={({ target }) => setEmail(target.value)} style={{ width: "20vw" }} placeholder='Enter your E-mail'></input>
                    </Email>
                    <Contact>
                        Contact: <br /> <input type="text" onChange={({ target }) => setContact(target.value)} style={{ width: "20vw" }} placeholder='Enter your phone number'></input>
                    </Contact>
                    <Password>
                        Password: <br /> <input type="password" onChange={({ target }) => setPassword(target.value)} style={{ width: "20vw" }} placeholder='Enter your password'></input>
                    </Password>
                    <button style={Button} onClick={handleSubmit}>Register</button>
                </Container>
            </div>
        )
}

export default Register
