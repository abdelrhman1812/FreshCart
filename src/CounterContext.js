import { createContext, useState } from "react";

export let CounterContext=createContext()

export default function CounterContextProvider(props){


    

const [counter, setcounter] = useState(0)
const [userName] = useState("Abdelrhman")

function changerCounter()
{
    setcounter(Math.random())
}

return <CounterContext.Provider  value={{counter ,userName ,changerCounter}} >

    {props.children}
</CounterContext.Provider>

}