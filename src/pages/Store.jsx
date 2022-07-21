import React, {useEffect, useState} from 'react'
import axios from "axios"
import styled from 'styled-components'
import StoreDetailsCard from '../components/StoreDetailsCard'
import StoreItemsList from '../components/StoreItemsList'

//CSS
const Wrapper = styled.div`
    display: flex;
`
const StoreItems = styled.div`
    flex :0.6;
`

const Store = () => {
    const [storeID,setStoreID] = useState("")
    const [store,setStore] = useState()

    var url=window.location.href
    useEffect(() => {

        //url -> current store id
        if(!storeID)
        for(var i=url.length-1;i>=0;i--) {
            if(url[i]==='/') {
                const s=url.substr(i+1)
                setStoreID(s)
                break;
            }
        }

        //api request to get details of current store, given store ID
        axios.post('http://localhost:5000/store/',{id:storeID})
            .then(res => setStore(res.data[0]))
            .catch(err => console.log(err))
    },[storeID])
    

    if(store) //return if details fetched
    return (
        <div>
            <Wrapper>
                <StoreDetailsCard store={store} />
                <StoreItems>
                    {
                    store.items.map(item => (
                        <StoreItemsList item={item}/>
                    ))
                    }
                </StoreItems>
            </Wrapper>
        </div>
    )
    else return (<h1>Loading...</h1>) //waiting for api response
}

export default Store