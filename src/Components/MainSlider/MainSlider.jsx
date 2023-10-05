import React from 'react'
import Slider from "react-slick";

export default function MainSlider() {





  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };














  return <>
    <div className='container mt-5'>

      <div className='row py-4 gx-0'>
        <div className='co-12 rounded-5 shadow '>

          <Slider {...settings}>
            <img src={require("../../Assets/images/s1.jpg")} height={400} className='w-100   ' alt="milk" />
            <img src={require("../../Assets/images/s2.jpg")} height={400} className="w-100 " alt="milk" />

          </Slider>

        </div>


      </div>
      <div className='row gy-3 p-2'>

        <div className='col-md-4 shadow'>

          <img src={require("../../Assets/images/lab.png")} className='w-100 ' alt="milk" />


        </div>
        <div className='col-md-4 '>

          <img src={require("../../Assets/images/control.png")} className="w-100 shadow" alt="milk" />


        </div>
        <div className='col-md-4 '>

          <img src={require("../../Assets/images/head.png")} className="w-100 shadow" alt="milk" />


        </div>
      </div>
    </div>

  </>

}
