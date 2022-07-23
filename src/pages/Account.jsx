import React from 'react'
import styled from 'styled-components'

//CSS
const Container = styled.div`
  margin-top: 5%;
  margin-left: 25vw;
  height: 70vh;
  width: 50vw;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 25px 50px -12px;
`
const Label=styled.label`
    display: inline-block;
    width: 20vw;
    margin-left: 2vw;
    font-weight: 600;
    line-height: 1.8;
`
const Span = styled.span`
    display: inline-block;
    width: 25vw;
    line-height: 1.8;
`
const PersonalDetails = styled.div`
    overflow: hidden;
    margin-bottom: 5px;
    font-size: 20px;
    padding: 3px 0 8px;
    line-height: 1.2;
    border-bottom: 1px solid #ececec;
`
const AddressColumn = styled.div`
font-size: 20px;
  display: flex;
  flex-direction: column;
`
const ButtonStyle = {
marginTop: "2vw",
  marginLeft: "2vw",
  backgroundColor: "black",
  color: "white",
  padding: "5px",
  fontSize: "20px",
  cursor: "pointer"
}


const Account = () => {
  return (
    <div>
      <Container>
        <PersonalDetails>
          <Label>Name: </Label>
          <Span>Saral Srivastava</Span>
          <Label>Email: </Label>
          <Span>saralsrivastava25@gmail.com</Span>
          <Label>Contact: </Label>
          <Span>+91 8176974204</Span>
        </PersonalDetails>
        <AddressColumn>
          <Label>Address Line 1
            <Span><input type="text" placeholder='Address Line 1'></input></Span>
          </Label>
          <Label>Address Line 2
            <Span><input type="text" placeholder='Address Line 2'></input></Span>
          </Label>
          <Label>Address Line 3
            <Span><input type="text" placeholder='Address Line 3'></input></Span>
          </Label>
        </AddressColumn>
        <button style={ButtonStyle}>Save Changes </button>
      </Container>
    </div>
  )
}

export default Account
