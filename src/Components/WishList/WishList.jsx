import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import { WishListContext } from '../../WishContext'
import toast from 'react-hot-toast'
import { Vortex } from 'react-loader-spinner'
import { CartContext } from '../../CartContext';
import logo from '../../Assets/images/freshcart-logo.svg'

export default function WishList() {


  const [load, setLoad] = useState(false)

  const { addProductToCart } = useContext(CartContext);
  const [Loading, setLoading] = useState(false)
  async function addProduct(id) {
    setLoad(true);

    let res = await addProductToCart(id);
    console.log(res);

    if (res.status === 'success') {
      setLoad(false);

      toast.success('Product is successfully added to the cart', {
        position: 'top-center'
      });
    } else {
      toast.error('Failed to add product to the cart', {
        position: 'top-center'
      });
    }
  }

  let { getLoggedUserWislist, removeProduct } = useContext(WishListContext)
  let [allProducts, setAllProducts] = useState(null)
  async function getProductWishlist() {

    let { data } = await getLoggedUserWislist()

    // console.log(data.data)
    setAllProducts(data.data)


  }


  useEffect(() => {


    getProductWishlist()
  }, [])







  async function removeElement(id) {
    setLoad(true)

    let { data } = await removeProduct(id)

    getProductWishlist()
    setLoad(false)


  }










  if (allProducts === null) {
    return <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
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
  }



  return <>
    {
      load ? <>
        <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

          <img src={logo} alt="logo" className='w-50 ' />
        </div>
      </> : ''
    }

    <div className='wish-list min-vh-100 mt-5 py-2'>
      <div className='container py-4' >



        <div className='row rounded-2  overflow-hidden p-4' >
          {allProducts.length === 0 ? <h3 className='text-center p-5  fw-bold bg-main-light '>wish list is empty :</h3> : <>



            <h3 className='text-center fw-bold bg-main-light p-3'>wishlist </h3>
            {allProducts?.map((product) => <div className='col-md-4 border-bottom py-2 px-2 p-2'>
              {/* image */}
              <div className='p-2 brdr-main rounded-2'>

                <div className=' text-center'>

                  <img src={product.imageCover} className='w-50 rounded-3  cart-img  ' alt="" />
                </div>

                {/* datails */}
                <div key={product.id} className=' d-flex flex-column align-items-center justify-content-center  '>
                  <div className='text-center '>

                    <div className='title py-2'>
                      <h3 className='h6 fw-bold'> {product.title.split(" ").slice(0, 1).join(" ")}</h3>
                      <h6 className='text-main'>{product.price}EGP</h6>
                    </div>


                    <button

                      onClick={() => {

                        removeElement(product.id)

                      }}
                      className='btn p-0'><i className=' text-danger mx-2 font-sm fas fa-trash-can '></i>Remove</button>
                  </div>

                  {/* btn to add to cart */}
                  <button className='btn bg-main text-light my-2  w-100' onClick={() => {
                    addProduct(product.id)
                  }}>


                    {Loading ?


                      <>
                        <Vortex visible={true} height='30' width='100' ariaLabel='vortex-loading' wrapperStyle={{}} wrapperClass='vortex-wrapper' colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']} />
                      </>

                      :


                      ' AddToCart'
                    }


                  </button>
                </div>
              </div>




            </div>
            )}

          </>}

        </div>
      </div>
    </div>









  </>

}
