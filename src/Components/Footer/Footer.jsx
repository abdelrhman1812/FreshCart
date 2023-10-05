import React from 'react'
import Style from './Footer.module.css'
import amzon from '../../Assets/images/amazonpay.svg'
import american from '../../Assets/images/american-express.svg'
import mastercard from '../../Assets/images/mastercard.svg'
import paypal from '../../Assets/images/paypal.svg'
import appstore from '../../Assets/images/appstore-btn.svg'
import googleplay from '../../Assets/images/googleplay-btn.svg'

export default function Footer() {

  return <>
    {

      localStorage.getItem("userToken") !== null ?

        <div className='footer p-5'>
          <div className='container'>
            <div className='row'>

              <h3 className='fw-bold'> Get The FreshCart app          </h3>

              <p> We will send you a link , open it in your phone to download the app </p>


              <div className='row gy-2 position-relative footer-brdr ' >
                <div className='col-md-9'>

                  <input type="email" className='form-control mb-2' placeholder='Email' />
                </div>
                <div className='col-md-3'>
                  <button className='btn bg-main text-light w-100 btn-sm px-md-0 mb-2'> Share App Link</button>
                </div>
              </div>
            </div>

            <div className='row py-2 text-center footer-brdr position-relative '>
              <div className='col-lg-6 '>

                <span className='d-block d-md-inline-block'> Payment Patners</span>
                <img src={amzon} className='ms-2' alt="" />
                <img src={american} className='ms-2' alt="" />
                <img src={mastercard} className='ms-2' alt="" />
                <img src={paypal} className='ms-2' alt="" />

              </div>

              <div className='col-lg-6 py-2 '>

                <span className='d-block d-md-inline-block'>Get deliveries with FresCart</span>


                <img src={appstore} className='ms-2' alt="" />
                <img src={googleplay} className='ms-2' alt="" />

              </div>
            </div>

          </div>


        </div>

        :
        ""



    }

  </>

}
