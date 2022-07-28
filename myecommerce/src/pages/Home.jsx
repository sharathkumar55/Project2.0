import React from 'react'
import Announcement from '../Components/Announcement'
import Category from '../Components/Category'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'


const Home = () => {
 
  return (
    <>
    <Announcement></Announcement>
    <Navbar/>
    <Slider></Slider>
    <Category></Category>
    </>
  )
}

export default Home