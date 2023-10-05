import { createContext, useState } from "react";




export let UserContxet=createContext();

export default function UserContxetProvider(props){

const [userToken, setUserToken] = useState(null)



// useEffect(() => {

//     if (localStorage.getItem("userToken") !== null) {
//       setUserToken(localStorage.getItem("userToken"))
//     }


//   }, [])

    return <UserContxet.Provider value={{userToken,setUserToken}}>


        {props.children}
    </UserContxet.Provider>
} 