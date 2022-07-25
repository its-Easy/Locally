import React from 'react'
import styled from 'styled-components'
import {stores} from "../storesDetails"

const Card = styled.div`
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--white);
    -webkit-box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
    box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
    -webkit-transition: -webkit-box-shadow .2s ease 0s;
    transition: -webkit-box-shadow .2s ease 0s;
    transition: box-shadow .2s ease 0s;
    transition: box-shadow .2s ease 0s,-webkit-box-shadow .2s ease 0s;
`
const ImgStyle = {
  marginTop: "20px",
  marginLeft: "15px",
  marginRight: "15px",
  width: "250px",
  height: "250px",
  opacity: "0.4"
}
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: var(--primary-black);
    margin-bottom: 4px;
`
const Locality = styled.div`
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 10px;
`

const StoresCard = (props) => {
  return (
    <div>
      <Card>
          <a target={"_blank"} href={"/store/"+props.store.id}>
          <img src={props.store.url} style={ImgStyle} />
          <Details>
            <Title>{props.store.title}</Title>
            <Locality>{props.store.locality}</Locality>
          </Details>
          </a>
        </Card>
    </div>
  )
}

export default StoresCard
