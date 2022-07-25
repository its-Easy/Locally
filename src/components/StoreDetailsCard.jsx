import React from 'react'
import styled from 'styled-components'

//CSS
const StoreDetails = styled.div`
    flex :0.4;
    margin-left: 10px;
    margin-top: 20vh;
    margin-right: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`
const StoreImg = {
    width: "200px",
    height: "180px",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "30px",
}
const StoreName = styled.h1`
`
const StoreAddress = styled.h5`
    display: flex;
    flex-direction: row;
    gap: 100px;
    margin-top: 10px;
    margin-bottom: 5px;
`
const StoreContact = styled.h5`
    display: flex;
    flex-direction: row;
    gap: 100px;  
    margin-top: 10px;
    margin-bottom: 5px;
`

const StoreDetailsCard = (props) => {
    return (
        <div>
            <StoreDetails>
                <img src={props.store.url} style={StoreImg} />
                <StoreName>{props.store.title}</StoreName>
                <StoreAddress>
                    <div>Address</div>
                    <div style={{ fontWeight: "200" }}>{props.store.locality}</div>
                </StoreAddress>
                <hr style={{ opacity: "0.4" }} />
                <StoreContact>
                    <div>Contact</div>
                    <div style={{ fontWeight: "200" }}>{props.store.contact}</div>
                </StoreContact>
            </StoreDetails>
        </div>
    )
}

export default StoreDetailsCard
