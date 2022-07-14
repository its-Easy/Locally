import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
    background-color: white;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    flex:1;
`
const Center = styled.div`
    flex:1;
    text-align:center;
`
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const SearchContainer = styled.div`
    width: 40%;
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    padding: 5px;
`
const Input = styled.input`
    margin-right: 5px;
    padding:5px;
    border:none;
`

const Logo = styled.div`
    font-weight: bold;
    font-size: 30px;
`

const MenuItem = styled.a`
    font-size: 14;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
    color: black;
`
const Navbar = () => {
    const [user,setUser] = useState("")
    useEffect(async () => {
        const authToken = localStorage.getItem('token')
        const res=await axios.post('http://localhost:5000/auth/verify-token',{token:authToken})
        setUser(res.data)
    })
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "grey", fontSize: 25 }} />
                    </SearchContainer>
                </Left>
                <Center><Logo>Locally.india</Logo></Center>
                <Right>
                    {
                    user?
                    <>
                    <MenuItem href="/account">Account</MenuItem>
                    <MenuItem href="/cart">
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </>
                    :
                    <>
                    <MenuItem href="/register">REGISTER</MenuItem>
                    <MenuItem href="/login" >SIGN IN</MenuItem>
                    </>
                    }
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar