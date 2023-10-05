import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Vortex } from 'react-loader-spinner'
import logo from '../../Assets/images/freshcart-logo.svg'

export default function ForgitPassword() {


  let navigate = useNavigate()
  const [loging, setloging] = useState(false)
  const [load, setLoad] = useState(false)


  async function sendCode(values) {
    setLoad(true)
    setloging(true)

    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      // console.log(data)
      if (data.statusMsg === 'success') {

        setloging(false)
        setLoad(false)

        navigate('/verify')

      }
      return data

    } catch (error) {


    }



  }


  let validationSchema = Yup.object({

    email: Yup.string().email("emial is invalid").required("email must be required"),




  })



  let formik = useFormik({
    initialValues: {
      email: ""
    }, validationSchema,
    onSubmit: sendCode

  })













  return <>


    {load ? <>
      <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

        <img src={logo} alt="logo" className='w-50 ' />
      </div>
    </> : ''}
    <div className="forgot mt-5 py-5">

      <div className='container p-5'>

        <div className='row py-5 forgitpassword bg-main-light rounded-4' id='forgitpassword ' >
          <h2 className='py-2'>Forgot password: </h2>

          <form onSubmit={formik.handleSubmit}>

            <input type="email" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' placeholder='Enter Youe Email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : ''}

            <div className='text-end'>


              <button type='submit' className='btn bg-main my-3 text-light'>

                {loging ? <Vortex
                  visible={true}
                  height="30"
                  width="50"

                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                /> :

                  ' Send Code '
                }

              </button>



            </div>

          </form>

        </div>





      </div>
    </div>

  </>



}



