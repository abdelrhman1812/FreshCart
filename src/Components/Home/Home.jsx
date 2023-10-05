import React, { useContext, useEffect } from 'react'
import Style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { CartContext } from '../../CartContext'



export default function Home() {


  return <>
    <div className='container'>
      <MainSlider />

    </div>

    <div className='container'>
      <div className='row'>

        <CategorySlider />
      </div>
    </div>

    <div className='container'>
      <div className='row'>

        <FeaturedProducts />
      </div>
    </div>


  </>

}
