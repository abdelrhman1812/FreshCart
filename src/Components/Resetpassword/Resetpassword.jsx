import React, { useState } from 'react'
import Style from './Resetpassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useNavigate } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
import logo from '../../Assets/images/freshcart-logo.svg'

export default function Resetpassword() {



  const [loging, setloging] = useState(false)


  const [load, setLoad] = useState(false)

  let navigate = useNavigate()


  async function resetNewPassword(values) {
    setloging(true)
    setLoad(true)

    try {

      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      // console.log(data)
      // console.log(values)
      setloging(false)
      setLoad(false)


      navigate('/login')
    } catch (error) {
      console.log(error)
    }


  }


  let validationSchema = Yup.object({

    email: Yup.string().email("emial is invalid").required("email must be required"),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "The first letter is capital and password is invalid  "),




  })


  let formik = useFormik({


    initialValues: {
      email: "",
      newPassword: ""
    }, validationSchema,

    onSubmit: resetNewPassword


  })




  return <>
    {
      load ? <>
        <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

          <img src={logo} alt="logo" className='w-50 ' />
        </div>
      </> : ''
    }


    <div className="rest mt-5 py-5">
      <div className='container  p-5'>
        <div className='row py-5 bg-main-light rounded-4'>

          <h2 className='fw-bold'>Reset Password :</h2>


          <form onSubmit={formik.handleSubmit}>




            <input className='form-control my-2' type="email" id='email' placeholder='Email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : ''}


            <input type="password" className='form-control my-3' id='newPassword' placeholder='Password' name='newPassword' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.newPassword}</div> : ''}

            <button className='btn btn-outline-success w-100 '>

              {loging ?

                <Vortex
                  visible={true}
                  height="30"
                  width="50"

                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
                :
                'Reset'

              }

            </button>

          </form>









        </div>


      </div>
    </div>
  </>

}
