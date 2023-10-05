import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'

export default function Register() {

  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [loging, setloging] = useState(false)
  const [success, setSuccess] = useState(null)
  async function registerSubmit(values) {
    setloging(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setloging(false)
        // console.log(err.response.data.message)
        seterror(err.response.data.message)
      })
    if (data.message === "success") {
      setloging(false)
      setSuccess("Success")
      setTimeout(() => {

        navigate('/login')
      }, 1000)

    }
  }


  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/




  let validationSchema = Yup.object({

    name: Yup.string().min(3, "name of length must be 3").max(10, "name of length must be 10").required("name must be requird"),
    email: Yup.string().email("emial is invalid").required("email must be required"),
    phon: Yup.string().matches(phoneRegExp, "phon is invalid").required("phone is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "The first letter is capital and password is invalid "),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "repassword must be eqiul password").required("repassword must be required"),



  })
  let formik = useFormik({

    //take for me inputs that i neede it
    initialValues: {
      name: "",
      email: "",
      phon: "",
      password: "",
      rePassword: ""

    }, validationSchema, validate: function () {
      seterror(null)

    },
    onSubmit: registerSubmit



  })

  // console.log(formik.values)
  return <>

    <div className="register mt-5 py-5">

      <div className='container'>
        <div className='row py-3 bg-main-light p-5 rounded-5'>

          {error ? <div className='alert alert-danger'>{error}</div> : ""}
          {success ? <div className='alert alert-success'>{success}</div> : ""}
          <h1 className='py-1'>Register Now :</h1>
          {/* onSubmit this form the method onsubmit call the function from formik */}
          <form onSubmit={formik.handleSubmit} >
            <label htmlFor="name" className='fw-bold'>Name : </label>

            <input type="text" className='form-control my-2' name='name' id='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Name' />

            {formik.errors.name && formik.touched.name ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div> : ''}

            <label htmlFor="email" className='fw-bold'>Email : </label>

            <input type="email" className='form-control my-2' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : ''}

            <label htmlFor="phone" className='fw-bold'>Phone : </label>

            <input type="tel" className='form-control my-2' name='phon' id='phon' value={formik.values.phon} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Phone' />
            {formik.errors.phon && formik.touched.phon ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.phon}</div> : ''}



            <label htmlFor="password" className='fw-bold'>Password : </label>

            <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Password' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div> : ''}


            <label htmlFor="rePassword" className='fw-bold'>rePassword : </label>

            <input type="password" className='form-control mb-2' name='rePassword' id='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Repassword' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div> : ''}
            <div className='text-end'>

              {loging ?


                <button className='btn bg-main p-0'>


                  <Vortex
                    visible={true}
                    height="30"
                    width="50"

                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                  />

                </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mb-2 text-white'>Regsiter</button>
              }
            </div>


          </form>




        </div>
      </div>
    </div>




  </>

}
