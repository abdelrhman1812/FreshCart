import React, { useContext, useState } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Vortex } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../CartContext'
import toast from 'react-hot-toast'



export default function ProductDetails() {


  let { addProductToCart } = useContext(CartContext)

  /* Add To Cart */
  const [loading, setLoading] = useState(false)

  async function addProduct(id) {
    setLoading(true)
    const res = await addProductToCart(id)
    // console.log(res)

    if (res.status === 'success') {

      toast.success("Products is success add", {
        position: 'top-center'
      })


    } else {
      toast.error("faild add product", {
        position: 'top-center'
      })
    }
    setLoading(false)


  }



  /* to use slider */

  var settings = {
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  /* params is use it to get id from path */
  let params = useParams()

  /* get product details */
  function getPrductDetails(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id} `)
  }

  let { isLoading, isError, data } = useQuery('productDetails', () => getPrductDetails(params.id))
  // console.log(allProductDetails)


  if (isLoading) {
    return <>

      <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
        <Vortex
          visible={true}
          height="100"
          width="100"

          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </div>

    </>
  }

  return <>
    <div className='product-details d-flex justify-content-center align-items-center vh-100'>

      <div className='container mt-5 '>

        {data?.data.data ? <div className='row py-5 overflow-hidden text-center  align-items-center py-5'>


          <div className='col-sm-4 mx-auto'>


            <Slider {...settings}>
              {data?.data.data.images.map((img) => < img key={data?.data.data.id} className='w-100 img-fluid' src={img} alt={data?.data.data.title} />)}
            </Slider>


          </div>

          <div className='col-md-8'>

            <h2 className='h5'>  {data?.data.data.title}</h2>


            <p>{data?.data.data.description}</p>

            <h6 className='text-main'>{data?.data.data.category.name}</h6>
            <h6 className='text-main'>Price : {data?.data.data.price} EGP</h6>
            <div className='d-flex justify-content-between'>

              <span>ratingsQuantity : {data?.data.data.ratingsQuantity}</span>
              <span><i className='fa fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>

            </div>

            {loading ? <button className='btn bg-main w-100 my-2 text-light'>
              <Vortex
                visible={true}
                height="30"
                width="100"

                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
              /></button> :
              <button onClick={() => { addProduct(data?.data.data.id) }} className='btn bg-main btn-sm w-100 my-2 text-light'>Add To Cart </button>
            }


          </div>


        </div> : ""}
      </div>
    </div>





  </>

}
