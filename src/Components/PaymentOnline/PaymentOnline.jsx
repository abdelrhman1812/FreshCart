import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

export default function PaymentOnline() {
  const [loging, setloging] = useState(false)


  let url = window.location.port

  console.log(url)


  /* from Cart Context  */
  const
    { cartId,
      setNumOfCartItems,
      setTotalCartPrice,
      setCartProducts
    }
      = useContext(CartContext);

  /*confirmCashPayment  */







  /* online */

  async function confirmOnlinePayment(values) {
    setloging(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem('userToken') },
          params: { url: `http://localhost:${url}` }

        },

      );

      if (data.status === "success") {
        setloging(false)

        toast.success("success ");
        setCartProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        window.open(data.session.url, "_blank")



      }
      else {
        toast.error("error")
      }
      console.log(values);
      console.log(data)
      return data;
    } catch (error) {
      return error;
    }
  }







  /* formik and Validition of it */

  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      "details": '',
      "phone": '',
      "city": '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required'),
      phone: Yup.string().matches(phoneRegExp, "phon is invalid").required("phone is required"),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: confirmOnlinePayment
  });

  return (
    <>
      <div className='container'>

        <div className='row  py-5 mt-5'>
          <div className='bg-light p-5 '>



            <h2>Shopping Address :</h2>
            <form onSubmit={formik.handleSubmit}>

              {/* Details */}

              <label htmlFor='details' className='fw-bold my-3'>Details:</label>
              <textarea
                type='text'
                className='form-control mb-2'
                name='details'
                id='details'
                value={formik.values.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.details && formik.errors.details && (
                <div className='alert alert-danger mt-2 p-2'>{formik.errors.details}</div>
              )}
              {/* Phone */}
              <label htmlFor="phone" className='fw-bold my-3'>Phone : </label>
              <input
                type='number'
                className='form-control mb-2'
                name='phone'
                id='phone'
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.phon && formik.errors.phon && (
                <div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>
              )}

              {/* city */}
              <label htmlFor='city' className='fw-bold my-3'>City:</label>
              <input
                type='text'
                className='form-control mb-2'
                name='city'
                id='city'
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city && (
                <div className='alert alert-danger mt-2 p-2'>{formik.errors.city}</div>
              )}


              <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-outline-success w-100 mt-2' >
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
                  : '    Confirm Cash Payment'

                }

              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}