
import axios from "axios";
import React, { createContext } from "react";

export const WishListContext = createContext();


let userToken=localStorage.getItem("userToken")

let headers={
    token:userToken


}


function addTowishList(id){


                return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                
                
                
                        {
                                productId:id
                        },
                        {
                                headers:{
                                    token: localStorage.getItem("userToken")
                                }
                        }
                
                
                ).then((response)=>{return response})
                .catch((error)=>{return error})





}




function getLoggedUserWislist(){


        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                
                
                
     
        {
            headers:{
                token: localStorage.getItem("userToken")
            }
        }


).then((response)=>{return response})
.catch((error)=>{return error})




}





/* remove */
async function removeProduct(id){


        try {
            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
            
            
            { headers:headers });

            return response;
        } catch (error) {
            return error;
        }
     
    }




export default function WishListContextProvider(props) {


        // async function addTowishList(id){
    
        //         try {
        //             const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        //                 {
        //                     productId: id
        //                 },
            
        //                 {
        //                     headers
        //                 }
        //             );
                        
        //                 // setCartProducts(data.data.products)
        //           return data;
        //         } catch (error) {
        //             return error;
        //         }
                
        //     }




        //         const [wisshListProduct, setWisshListProduct] = useState([])

        //     async function getLoggedUserWislist(){
    
    
        //         try {
        //             let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                
                
                
     
        //             {
        //                     headers
        //             }
            
            
        //     )
        //         // console.log(data.data)
        //         setWisshListProduct(data.data)
        //         getLoggedUserWislist()

        //             return data;
        //         } catch (error) {
        //             return error;
        //         }
                
        //     }  

            
            

            
            
            
        //     async function removeProduct(id){
                    
                    
        //         try {
        //             let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
                    
                    
        //             { headers:headers });
        //             console.log(data)
                  
        //                 getLoggedUserWislist()
        //                 return data;
        //         } catch (error) {
        //             return error;
        //         }
             
        // }
        
        
        
        // useEffect(()=>{

        //     getLoggedUserWislist()
        // },[])




  return (
    <WishListContext.Provider value={{ addTowishList ,getLoggedUserWislist ,removeProduct }}>
      {props.children}
    </WishListContext.Provider>
  );
}