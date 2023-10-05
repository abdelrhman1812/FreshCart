import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
import { UserContxet } from '../../userContext'
import logo from '../../Assets/images/freshcart-logo.svg'

export default function Login() {

  let { userToken, setUserToken } = useContext(UserContxet)
  const [load, setLoad] = useState(false)

  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [loging, setloging] = useState(false)
  async function loginSubmit(values) {
    setloging(true)
    setLoad(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setloging(false)
        // console.log(err.response.data.message)
        seterror(err.response.data.message)
      })
    if (data.message === "success") {
      setLoad(false)
      // console.log(data.token)
      setloging(false)
      localStorage.setItem("userToken", data.token)
      setUserToken(data.token)
      console.log(userToken)
      navigate('/')

    } else {
      setLoad(false)


    }
  }






  let validationSchema = Yup.object({

    email: Yup.string().email("emial is invalid").required("email must be required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid "),




  })
  let formik = useFormik({

    //take for me inputs that i neede it
    initialValues: {

      email: "",

      password: "",


    }, validationSchema,
    onSubmit: loginSubmit



  })

  // console.log(formik.values)
  return <>

    {
      load ? <>
        <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

          <img src={logo} alt="logo" className='w-50 ' />
        </div>
      </> : ''
    }
    <div className="login mt-5 py-5 ">
      <div className='container p-4'>
        <div className='row py-4 bg-main-light px-3 rounded-4  ' >

          {error ? <div className='alert alert-danger'>{error}</div> : ""}

          <h2 className='fw-bold '>Login Now :</h2>
          {/* onSubmit this form the method onsubmit call the function from formik */}
          <form onSubmit={formik.handleSubmit} >

            <label htmlFor="email">Email : </label>

            <input type="email" className='form-control mb-2' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : ''}


            <label htmlFor="password">Password : </label>

            <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Paaword' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div> : ''}

            <div className='text-end'>

              {loging ? <button className='btn bg-main p-0'>


                <Vortex
                  visible={true}
                  height="30"
                  width="50"

                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />

              </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mb-2 text-white'>Login</button>
              }


              <Link to={'/forgetPassword'}>

                <span className='px-2 fw-bold'>
                  forgetPassword?

                </span>
              </Link>
            </div>



          </form>




        </div>
      </div>

    </div>



  </>

}
