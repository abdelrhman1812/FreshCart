import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContxet } from '../../userContext'
import { CartContext } from '../../CartContext'
export default function Navbar(props) {

  let { numOfCartItems } = useContext(CartContext)

  let navigate = useNavigate()

  let { userToken, setUserToken } = useContext(UserContxet)


  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null)
    navigate("/login")

  }
  return <>




    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top z-3 w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh market logo " />
        </Link>

        <button className="navbar-toggler   brdr-main" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            {userToken !== null ?
              <>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home </Link>
                </li>


                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/categories">Categoreis</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/brands">Brands</Link>
                </li>









              </> : ""
            }


          </ul>

          <ul className="navbar-nav  mb-2 mb-lg-0">
            {/* <li className="nav-item d-flex align-items-center">
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>
            </li> */}

            {userToken !== null ? <>
              <div className='d-flex'>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/wishlist"><i className="fa-solid wish fa-heart text-main" ></i></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active position-relative" aria-current="page" to="/cart">  <i className="fa-solid shopping fa-cart-shopping  position-relative ">
                    <span className="  badge rounded-pill position-absolute  ico   ">
                      {numOfCartItems}
                    </span>
                  </i>



                  </Link>




                </li>


                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/allOrders"> <i className="fa-solid  shopping text-main fa-basket-shopping"></i></Link>
                </li>
              </div>


              <li className="nav-item">
                <span className="nav-link active cursor-pointer fw-bold" aria-current="page" onClick={() => { logOut() }} >Logout


                </span>


              </li>

            </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>


                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>

              </>
            }







          </ul>

        </div>
      </div>
    </nav>




  </>

}
