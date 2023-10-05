import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export let CartContext=createContext();



// let userToken=localStorage.getItem("userToken")

// let headers={
//     token:userToken
 
   
// }





// async function getLoggedUserCart(){
    
    
//     try {
//         let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers:headers });
//         return response;
//     } catch (error) {
//         return error;
//     }
    
// }

/* remove */



/* updateCount */
// async function updateCount(id,count){
    
    
//     try {
//         let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            
//             count
//         }
//         ,{ headers:headers });
//         return response;
//     } catch (error) {
//         return error;
//     }
    
// }



// async function addToCart(id){
    
    //     try {
        //         const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        //             {
            //                 productId: id
            //             },
            
            //             {
                //                 headers
                //             }
                //         );
                //         return response;
                //     } catch (error) {
                    //         return error;
                    //     }
                    
                    
                    // }
                    
                    
                    
                    
                    export default function CartContextProvider(props){
                        
                        const [numOfCartItems, setNumOfCartItems] = useState(0)
                        const [cartProducts, setCartProducts] = useState(null)
                        const [totalCartPrice, setTotalCartPrice] = useState(0)
                        const [cartId, setCardId] = useState(null)


                        async function addProductToCart(id){
    
                            try {
                                const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                                    {
                                        productId: id
                                    },
                        
                                    {
                                        headers:{
                                          token:  localStorage.getItem("userToken")
                                        }
                                    }
                                );
                                getLoggedUserCart()
                                    // setNumOfCartItems(data.numOfCartItems)
                                    // setTotalCartPrice(data.data.totalCartPrice)
                                    // setCartProducts(data.data.products)
                              return data;
                            } catch (error) {
                                return error;
                            }
                            
                        }


                        async function getLoggedUserCart(){
    
    
                            try {
                                let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
                                
                                
                                {  
                                    headers:{
                                    token:  localStorage.getItem("userToken")
                                  }});
                                setNumOfCartItems(data.numOfCartItems)
                                setTotalCartPrice(data.data.totalCartPrice)
                                setCartProducts(data.data.products)
                                setCardId(data.data._id)
                                return data;
                            } catch (error) {
                                return error;
                            }
                            
                        }  


                        async function removeProduct(id){
    
    
                            try {
                                let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
                                
                                {
                                    
                                    headers:{
                                        token:  localStorage.getItem("userToken")
                                      } 

                                });
                                setNumOfCartItems(data.numOfCartItems)
                                setTotalCartPrice(data.data.totalCartPrice)
                                setCartProducts(data.data.products)
                                return data;
                            } catch (error) {
                                return error;
                            }
                            
                        }





                    /* updateCount */
                            async function updateCount(id,count){
                                
                                
                                try {
                                    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                                        
                                        count
                                    }
                                    ,{  headers:{
                                        token:  localStorage.getItem("userToken")
                                      }  });
                                      setNumOfCartItems(data.numOfCartItems)
                                      setTotalCartPrice(data.data.totalCartPrice)
                                      setCartProducts(data.data.products)
                                    return data;
                                } catch (error) {
                                    return error;
                                }
                                
                            }

                            /* clear Cart */
                        async function clearCart(){

                                    try{

                                        let {data}=axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        
                                            {
        
                                                headers:{
                                                    token:  localStorage.getItem("userToken")
                                                }
                                            }
                                        
                                        )
                                        setNumOfCartItems(0)
                                        setTotalCartPrice(0)
                                        setCartProducts([])
                                        return data
                                    }
                                    catch(error){
                                        return error
                                    }



                        }


                        useEffect(()=>{
                            getLoggedUserCart()
                        },[])

return <CartContext.Provider value={
{addProductToCart,getLoggedUserCart,removeProduct ,
numOfCartItems ,cartProducts,totalCartPrice,
updateCount ,clearCart ,cartId ,
setNumOfCartItems,
setTotalCartPrice,
setCartProducts }}>
    {props.children}
</CartContext.Provider>

}