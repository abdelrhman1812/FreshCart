import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Vortex } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Brands() {


  let [brand] = useState([])
  let [brandDetail, setBrandDetail] = useState(null)





  /* Get All Brands */

  function getBrands() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }


  let { data, isLoading } = useQuery('brands', getBrands)
  // console.log(data?.data.data)
  brand = data?.data.data


  /* Loading */

  if (isLoading) {
    return <div className='d-flex justify-content-center align-items-center w-100 vh-100'>

      <>
        <Vortex
          visible={true}
          height="100"
          width="100"

          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </>
    </div>


  }



  /* Get brand by id */
  async function getSubBrands(id) {

    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);


      const brands = response.data.data;
      setBrandDetail(brands);
      // console.log(brands)
      // brandDetail.push(brands)
    } catch (error) {
      console.error(error);
    }
  }






  return <>

    {/* modal to display sub brands */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">




              <div className="row gy-3">
                {brandDetail !== null ? <div className=''>
                  <div>
                    <img src={brandDetail.image} alt={brandDetail.name} className='w-100' />

                  </div>
                  <div>
                    <h1 className='bg-success rounded-3 text-center text-light' >{brandDetail.name}</h1>

                  </div>



                </div>

                  :


                  <>



                    <Vortex
                      visible={true}
                      height="100"
                      width="100"

                      ariaLabel="vortex-loading"
                      wrapperStyle={{}}
                      wrapperClass="vortex-wrapper"
                      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                  </>
                }

              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    {/* Brands */}
    <div className='container mt-5'>

      <div className="row py-5 gy-3">

        {brand?.map((product) => <div onClick={() => getSubBrands(product._id)} key={product._id} className='col-6  col-lg-4'  >
          <div className='text-center brands py-2 rounded-3 overflow-hidden'>

            <img src={product.image} className='w-100' alt="" />

            <h4 className=''>{product.name}</h4>
            <Link data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <button className='btn btn-outline-success'> Details   </button>

            </Link>




          </div>

        </div>)}
      </div>
    </div>




  </>

}