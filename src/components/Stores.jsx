import React from 'react'
import styled from 'styled-components'
import StoresCard from './StoresCard'

//CSS
const DisplayStores = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 20px;
  align-items: center;
`
const Index = styled.h1`
  font-size:40px; 
  font-weight:700;  
  letter-spacing:1px; 
  text-transform:uppercase; 
  width:160px; 
  text-align:center; 
  margin-left: 30px;
  margin-top: 50px;
  white-space:nowrap; 
  padding-bottom:13px;

  &:before {
    background-color: #c50000;
    content: '';
    display: block;
    height: 3px;
    width: 75px;
    margin-bottom: 5px;
  }
  &:after {
    background-color: #c50000;
    content: '';
    display: block;
    margin-left: 100%;
    height: 3px;
    width: 75px;
    margin-bottom: 0.25em;
  }
`

const Stores = () => {
  return (
    <><Index>Kirana Stores nearby ...</Index>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        <DisplayStores>
          {stores.map(store => (
            <StoresCard store={store} />
          ))}
        </DisplayStores>
      </div>
    </>
  )
}

export default Stores
