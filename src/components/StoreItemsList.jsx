import { AddBoxOutlined, IndeterminateCheckBoxOutlined, } from '@material-ui/icons'
import React, { setState, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

//CSS
const ItemCard = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    padding: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
const ItemName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    font-weight: 500;
    font-size: 20px;
`
const ItemPrice = styled.div`
    font-weight: 600;
    font-size: 25px;
    justify-content: center;
    flex-direction: flex-start;
`
const Amount = styled.div`
    width:30px;
    height:30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const QuantityContainer = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    font-weight: 700;
`

//getting store details as props
const StoreItemsList = (props) => {
    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity ? props.item.quantity : 0)

    //function to add item to cart
    const handleAdd = async () => {
        setQuantity(quantity + 1)
        await axios.post('http://localhost:5000/cart/add', { email: "saralsrivastava25@gmail.com", items: props.item })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    //function to remove item from cart
    const handleRemove = async () => {
        if (quantity === 1) setItem()
        else setQuantity(quantity - 1)
        await axios.post('http://localhost:5000/cart/delete', { email: "saralsrivastava25@gmail.com", items: props.item })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    //if item exists (quantity>0) return item card
    if (item)
        return (
            <div>
                <ItemCard>
                    <img src={item.img} style={{ width: "100px", padding: "5px", border: "0.5px solid lightgray", borderRadius: "10%" }} />
                    <ItemName>
                        {item.name}
                        {item.seller ? (<div style={{ fontSize: "15px", fontWeight: "200" }}>{props.item.seller}</div>) : ""}
                        <ItemPrice>
                            ₹{item.price}
                        </ItemPrice>
                    </ItemName>
                    <QuantityContainer>
                        <button onClick={handleAdd} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}><AddBoxOutlined style={{ fontSize: "30px" }} /></button>
                        <Amount>{quantity}</Amount>
                        <button onClick={handleRemove} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}><IndeterminateCheckBoxOutlined style={{ fontSize: "30px" }} /></button>
                    </QuantityContainer>
                </ItemCard>
            </div>
        )
    else return (<h1></h1>)
}

export default StoreItemsList