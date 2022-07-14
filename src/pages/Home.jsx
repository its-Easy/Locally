import React from 'react'
import Navbar from '../components/Navbar'
import Location from '../components/Location'
import Stores from '../components/Stores'

const Home = () => {
  return (
    <>
      <Location></Location>
      <Stores></Stores>
    </>
  )
}

export default Home