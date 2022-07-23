import React, {useEffect,useState} from 'react'
import StoreItemsList from '../components/StoreItemsList'
import styled from 'styled-components'
import axios from 'axios'

//CSS
const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const OrderSummary = styled.div`
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    width: 50vw;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 15vh;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const buttonStyle = {
    backgroundColor: "black",
    width: "100%",
    color: "white",
    fontSize: "25px",
}


var subTotal=0 // to calculate total cost of items in cart
const Cart = () => {
    const [user, setUser] = useState("")
    const [cart,setCart] = useState()
    // const [subTotal,setSubTotal] = useState(0)
    
    useEffect(async () => {
        const authToken = localStorage.getItem('token')
        const res = await axios.post('http://localhost:5000/auth/verify-token', { token: authToken })
        setUser(res.data)
    })

    useEffect(async () => {
        if(!cart)
        await axios.post('http://localhost:5000/cart/',{email:"saralsrivastava25@gmail.com"})
            .then(res => setCart(res.data.items))
            .catch(err => console.log(err))
    },[])

    if(cart) {
        subTotal=0

        //calculate total price
        cart.map(item=>(subTotal+=item.price*item.quantity))
    }
    
    const placeOrder = async () => {
        let state= []

        //state = [
        //     ["seller1.email.com"] = [
        //         {
        //             name: "name1",
        //             quantity: QUANTITY1,
        //             price: PRICE1
        //         },
        //         {
        //             name: "name2",
        //             quantity: QUANTITY2,
        //             price: PRICE2
        //         }
        //     ],
        //     ["seller2.email.com"] = [
        //         {
        //             name: "name1",
        //             quantity: QUANTITY1,
        //             price: PRICE1
        //         }
        //     ]
        // ]  

        cart.map(item=>(
            state[item.sellerEmail]=[]
        ))
        cart.map(item=>(
            state[item.sellerEmail].push({name: item.name,quantity: item.quantity,price: item.price})
        ))
        console.log(state)

        const customer = await axios.post('http://localhost:5000/user-details/',{email: user.email})
        Object.keys(state).forEach((key,index) => {
            console.log(key)
            console.log(state[key])
            axios.post('http://localhost:5000/place-order/',{customer: customer.data, seller: key,state: state[key]})
        })
    }

    if(!user) return <h1>Sign in to continue</h1>
    else if(cart)
    return (
        <div>
            <Container>
                <div style={{ width: "100vw",marginTop: "25px",marginLeft:"40px"}}>
                {
                cart.map(item=>(
                    <StoreItemsList item={item}/>
                ))    
                }
                </div>
                <OrderSummary>
                    <h1>ORDER SUMMARY</h1>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>₹{subTotal}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Delivery Charges</SummaryItemText>
                        <SummaryItemPrice>₹39</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Delivery Discount</SummaryItemText>
                        <SummaryItemPrice>-₹39</SummaryItemPrice>
                    </SummaryItem>                    
                    <SummaryItem style={{fontSize:"25px",fontWeight:"600"}}>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>₹{subTotal}</SummaryItemPrice>
                    </SummaryItem>
                    <button onClick={placeOrder} style={buttonStyle}>PLACE ORDER</button>
                </OrderSummary>
            </Container>

        </div>
    )
    else return (<h1>Loading...</h1>)
}

export default Cart
