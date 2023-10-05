import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './CounterContext'
import { UserContxet } from './userContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from'./Components/ProductDetails/ProductDetails'
import CartContextProvider from './CartContext'
import  { Toaster } from 'react-hot-toast';
import Subcategories from './Components/Subcategories/Subcategories'
import ForgitPassword from'./Components/ForgitPassword/ForgitPassword'
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './WishContext'
import Payment from './Components/payment/payment'
import AllOrders from './Components/AllOrders/AllOrders'
import Verify from './Components/Verify/Verify'
import Resetpassword from'./Components/Resetpassword/Resetpassword'
import SubBrands from './Components/SubBrands/SubBrands'
import PaymentOnline from './Components/PaymentOnline/PaymentOnline'

let routers=createBrowserRouter(


  [

    {path:"", element:(<Layout /> ) ,


    children:
    
          [
              {index:true, loader:()=> redirect ("home")    },
              {path:'home', element:<ProtectedRoute><Home/> </ProtectedRoute>  }   ,
    
          {path:'login', element:<Login/>},
          {path:'register', element:<Register/>},
          {path:'products', element:<ProtectedRoute><Products/> </ProtectedRoute>  }   ,
          
          {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},

          
          {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
          {path:'subbrands/:id', element:<ProtectedRoute><SubBrands/></ProtectedRoute>},
          {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},    
          {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
          {path:'subcategoris/:id', element:<ProtectedRoute><Subcategories/></ProtectedRoute>},
          {path:'wishlist', element:<ProtectedRoute><WishList/></ProtectedRoute>},
          {path:'payment', element:<ProtectedRoute><Payment/></ProtectedRoute>},
          {path:'paymentonline', element:<ProtectedRoute><PaymentOnline/></ProtectedRoute>},

          {path:'allorders', element:<ProtectedRoute><    AllOrders          /></ProtectedRoute>},

          {path:'forgetPassword', element:<ForgitPassword/>},
          {path:'verify', element:<Verify/>},
          {path:'rePassword', element:   <Resetpassword/>},


          {path:'*', element: <ProtectedRoute> <Notfound/></ProtectedRoute>   }

    ]

      }

      ]

      )






 function App() {

  let { setUserToken } = useContext(UserContxet)

  useEffect(() => {

    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"))
    }


  }, [])


  return <>
  <WishListContextProvider>
<CartContextProvider>

<CounterContextProvider>

        <RouterProvider router={routers}>
          </RouterProvider>  
 
</CounterContextProvider>
<Toaster/>

</CartContextProvider>
  </WishListContextProvider>



  </>

}


export default App;