import React from 'react'
import Style from './Notfound.module.css'
import error from '../../Assets/images/error.svg'
export default function Notfound() {
  return <>
    <div className='container h-100'>

      <div className='row'>
        <div className='col-12' >

          <img src={error} alt="" className='w-100' />
        </div>
      </div>

    </div>
  </>

}
