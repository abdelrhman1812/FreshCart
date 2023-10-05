import React, { useState } from 'react'
import Style from './Verify.module.css'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
import logo from '../../Assets/images/freshcart-logo.svg'

export default function Verify() {
  const [loging, setloging] = useState(false)











  const [load, setLoad] = useState(false)







  let navigate = useNavigate()
  async function resetPassword(values) {
    setloging(true)
    setLoad(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)

    console.log(data)
    if (data.status === 'Success') {
      setloging(false)
      setLoad(false)


      navigate('/rePassword')
    }


  }


  let verfiyFormik = useFormik({


    initialValues: {
      resetCode: ""
    },

    onSubmit: resetPassword

  })
  return <>

    {load ? <>
      <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

        <img src={logo} alt="logo" className='w-50 ' />
      </div>
    </> : ''}

    <div className="verify mt-5 py-5">



      <div className='container p-5'>

        <div className='row py-2 bg-main-light rounded-4' >
          <h2 className='fw-bold'>verify:</h2>
          <form onSubmit={verfiyFormik.handleSubmit}>



            <input type="text" id='number' className='form-control my-3' value={verfiyFormik.values.resetCode} name='resetCode' onChange={verfiyFormik.handleChange} onBlur={verfiyFormik.handleBlur} placeholder='Code' />


            <div className='text-end py-2'>

              <button type='submit' className='btn bg-main text-light'>

                {loging ? <Vortex
                  visible={true}
                  height="30"
                  width="50"

                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                /> :

                  '   veiry Code'
                }


              </button>
            </div>



          </form>
        </div>
      </div>
    </div>
  </>

}
