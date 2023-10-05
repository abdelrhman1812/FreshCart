import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';

export default function AllOrders() {



  const [userOrder, setUserOrder] = useState(null);

  /* get user Id from localStorage */
  useEffect(() => {
    const token = jwtDecode(localStorage.getItem('userToken'));
    getOrders(token.id);
  }, []);

  /* get orders */
  async function getOrders(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setUserOrder(data);
    } catch (error) {
      console.error(error);
    }
  }


  /* loading when no order data is available */
  if (userOrder === null) {
    return (
      <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
        <Vortex
          visible={true}
          height='100'
          width='100'
          ariaLabel='vortex-loading'
          wrapperStyle={{}}
          wrapperClass='vortex-wrapper'
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </div>
    );
  }

  return (
    <>
      <div className='container mt-5'>
        <div className='row py-4 gy-5'>
          {userOrder.map((order) => (
            <div key={order.id} className='col-12'>
              <div className='order rounded-3'>
                {/* cartItems */}
                <div className='container'>
                  <div className='row bg-main-light py-2 rounded-3'>
                    {order.cartItems?.map((item) => (
                      <div key={item.id} className='col-12 col-md-6 p-3'>
                        <div className='cart-info py-3 text-center'>
                          <div className='row'>
                            <div className='col-6'>
                              <img src={item.product.imageCover} className='w-50 p-2' alt={item.product.title} />
                            </div>
                            <div className='col-6'>
                              <p className='fw-bold'>{item.product.title.split(' ').splice(0, 1).join(' ')}</p>
                              <p className='text-main'>Count: {item.count}</p>
                              <p className='text-main fw-bold'>Price: {item.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className='col-lg-6 p-3'>
                      {/* Details of order */}
                      <div className='px-3 mt-2 py-2 text-center details-order'>
                        <h5 className='fw-bold'>Phone: {order.shippingAddress.phone}</h5>
                        <h5 className='fw-bold'>City: {order.shippingAddress.city}</h5>
                        <h5 className='fw-bold'>Details: {order.shippingAddress.details}</h5>
                        <h5 className='fw-bold'>Payment Method: {order.paymentMethodType}</h5>
                        <h5 className='fw-bolder text-main'>Total Price: {order.totalOrderPrice}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}