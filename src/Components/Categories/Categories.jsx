import React, { useState } from 'react'
// import Style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Vortex } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
export default function Categories() {

  const [productSubCategorise, setProductSubCategorise] = useState([])


  const [loading, setLoading] = useState(false)

  async function getsubcategories(id) {

    setLoading(true)
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);

      setProductSubCategorise(response.data.data);
      setLoading(false)

    } catch (error) {
      return error;
    }
  }


  /* get All Categories */

  function getCategories() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  let { isLoading, data } = useQuery('category', getCategories)


  /* loading */

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

    {/* All Category */}
    <div className='container mt-5'>

      <div className='row  gy-4 gx-3 py-5'>
        {data?.data.data.slice(1).map((product) => <div key={product._id} className="  col-md-4 mb-5  ">
          <Link to={`/subcategoris/${product._id}`}>

            <div className="box-Portfolio  " onClick={() => getsubcategories(product._id)} >
              <div className="image">
                <img src={product.image} className=' rounded-3' alt={product.name} />
              </div>
              <div className="text-port p-4">
                <h3 className='text-main text-center p-3 fw-bold'>{product.name}</h3>

              </div>


            </div>
          </Link>
        </div>)}

      </div>
    </div>








  </>

}
