import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
export default function Subcategories() {

  let params = useParams()
  // console.log(params)



  function getsubcategories(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }


  let { isLoading, data } = useQuery('Subcategories', () => getsubcategories(params.id))
  // console.log(data?.data.data)














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



    <div className='sub-category min-vh-100 bg-main-light d-flex justify-content-center align-items-center  '>
      <div className='container mt-5'>

        <div className="row g-3 py-5">
          <h2 className='fw-bold'> Sub Categories :</h2>

          {data?.data.data.map((subcategory) =>



            <div key={subcategory._id} className='  col-12 col-lg-6  rounded-2 '>
              <div className='p-2 '>

                <div className=' subcategory p-3 text-center'>
                  <h4 className='text-main'>{subcategory.name}</h4>
                </div>
              </div>
            </div>





          )}

        </div>
      </div>

    </div>






  </>



}
