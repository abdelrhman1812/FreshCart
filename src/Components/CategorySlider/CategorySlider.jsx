import React from 'react';
import Style from './CategorySlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Vortex } from 'react-loader-spinner';
import Slider from 'react-slick';

export default function CategorySlider() {
  var settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { isLoading, data } = useQuery('category', getCategory);

  return (
    <>
      {data?.data.data ? (
        <>
          {isLoading ? (
            <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
              <Vortex visible={true} height='100' width='100' ariaLabel='vortex-loading' wrapperStyle={{}} wrapperClass='vortex-wrapper' colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']} />
            </div>
          ) : (
            <div className='row py-2'>
              <Slider {...settings}>
                {data?.data.data.map((category) => (
                  <div key={category._id} className='col-6 col-md-4 p-2 overflow-hidden'>
                    <div className='brdr-main rounded-2 '>

                      <img src={category.image} height={200} className='w-100 rounded-2 ' />
                      <h6 className='py-2 text-center fw-bold'>{category.name.split(' ').splice(0, 1).join(' ')}</h6>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
}