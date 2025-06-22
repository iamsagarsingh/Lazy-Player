import { useEffect, useReducer } from "react";
import type { Action, State } from "../context/PlayerContext";


export function useLocalStorage(key:string,reducer:React.Reducer<State,Action>,initialState:State){
    const [state,dispatch] = useReducer(reducer,initialState,(initial)=>{
        const jsonData = localStorage.getItem(key)
        if(jsonData !== null) return JSON.parse(jsonData)
        else return initial
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state])

    return [state,dispatch] as const

}