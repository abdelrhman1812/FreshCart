import { createContext, useState } from "react";



export let CodeContext=createContext()


export default function  CodeContextProvider (props){

    const [codetext, setcCodeText] = useState('')


    return<CodeContext.Provider value={{codetext,setcCodeText}}>
        {props.children}
    </CodeContext.Provider>


    
}
