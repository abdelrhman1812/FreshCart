import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import mastercard from '../../Assets/images/mastercard.svg'


export default function Cart() {

  let { cartProducts, numOfCartItems, totalCartPrice, removeProduct, getLoggedUserCart, updateCount, clearCart } = useContext(CartContext)

  const [load, setLoad] = useState(false)

  let navigate = useNavigate()


  useEffect(() => {

    getLoggedUserCart();


  }, []);

  /* remove */
  async function removeElement(id) {
    setLoad(true)
    let res = await removeProduct(id);
    // console.log(res)
    if (res.status === 'success') {
      setLoad(false)


      toast.success("Products is success remove", {
        position: 'top-center'
      })


    } else {
      toast.error("faild remove product", {
        position: 'top-center'
      })
    }



  }
  /* updateCount */


  async function updateCountCard(id, count) {

    let { data } = await updateCount(id, count);
    // console.log(data)
  }



  /* clear Cart */

  async function clearAllProducts() {
    setLoad(true)


    await clearCart()
    setLoad(false)



  }







  /* loading if no product in cart affter claer all cart */
  if (cartProducts === null) {
    return <div className='d-flex justify-content-center align-items-center  w-100 vh-100'>

      <>

        <div className='w-75 my-3 mx-auto p-3 bg-main-light rounded-5 '>
          <h3>Cart Empty</h3>
          <div  >



            <h4 className=' h6 text-main fw-bolder'> Cart Item : {numOfCartItems}    </h4>
            <h6 className='  text-main fw-bolder'> Cart Total : {totalCartPrice}    </h6>
          </div>

        </div>

      </>
    </div>


  }

  /* display if not add product to cart when remove it*/


  /* call when i need payment cash */
  function move() {

    navigate("/payment")

  }

  function moveonline() {
    navigate("/paymentonline")

  }





  return <>

    {load ? <>
      <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

        <img src={logo} alt="logo" className='w-50 ' />
      </div>
    </> : ''}

    <div className='cart-shoppig mt-5 py-2 '>

      <div className='w-75 my-3 mx-auto p-3  mt-5   '>

        {cartProducts.length === 0 ?
          <>
            <div className=' vh-100 p-3'>
              <div className='bg-main-light p-3 rounded-3'>

                <h3 className='bg-main-light'>Cart Empty: </h3>
                {/* title and btn to check out */}
                <div className='d-md-flex justify-content-between  align-items-center py-2 ' >
                  <div className='' >




                    <h4 className=' h6 text-main fw-bolder'> Cart Item : {numOfCartItems}    </h4>
                    <h6 className='  text-main fw-bolder'> Cart Total : {totalCartPrice}    </h6>
                  </div>
                </div>


              </div>
            </div>



          </>

          : ""}

        {cartProducts.length === 0 ? "" :
          <>
            {/* title and btn to check out */}
            <div className='d-md-flex justify-content-between  align-items-center py-2 ' >
              <div className='px-2' >
                <h3 className='fw-bold'>Shoping : </h3>



                <h4 className=' h6 text-main fw-bolder'> Cart Item : {numOfCartItems}    </h4>
                <h6 className='  text-main fw-bolder'> Cart Total : {totalCartPrice}    </h6>
              </div>


              <div className=' '>
                <button onClick={move} className='btn btn-outline-success   mx-2  btn-sm' >
                  Payment cash </button>
                <button onClick={moveonline} className='btn btn-outline-success   mx-2  my-2 btn-sm'>
                  Payment online <i className="fa-brands fa-cc-visa text-warning"></i> </button>

              </div>
            </div>

          </>


        }





        {/* display Products */}
        {cartProducts.map((product) => <div key={product.product.id} className='row border-bottom py-2 px-2 align-items-center'>

          {/* img of products */}
          <div className='py-3 col-md-2 text-center'>

            <img src={product.product.imageCover} className='w-100 img-fluid cart-img' alt={product.product.title} />
          </div>
          {/*  datials of products  */}
          <div className='col-md-9'>
            <div className='d-flex justify-content-between align-items-center'>

              <div className='title'>
                <h3 className='h6 fw-bold' > {product.product.title.split(' ').splice(0, 2).join(' ')}</h3>
                <h6 className='text-main'>Price : {product.price}EGP</h6>
              </div>
              <div>
                {/* btn to update and remove */}
                <button onClick={() => { updateCountCard(product.product.id, product.count + 1) }} className='btn btn-outline-success p-1'>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={() => { updateCountCard(product.product.id, product.count - 1) }} className='btn btn-outline-success brdr-main p-1'>-</button>
              </div>
            </div>
            <div className='rm-item  py-2 '>

              <button onClick={() => { removeElement(product.product.id) }} className='btn btn-danger px-2 py-1'><i className=' text-danger mx-2 font-sm fas fa-trash-can text-light'></i>Remove</button>
            </div>
          </div>




        </div>
        )}

        {cartProducts.length !== 0 ?


          <>
            <button onClick={clearAllProducts} className='w-100 btn btn-outline-danger'> Clear Cart</button>

          </>

          : ""}



      </div>
    </div>

  </>

}



