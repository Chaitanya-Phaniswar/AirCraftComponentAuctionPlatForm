
import {useContext} from 'react'
import { UserContext } from './context/UserContext'
export const Logout = (userContext,setUserContext) =>{
    fetch("http://localhost:3001/users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      window.localStorage.setItem("logout", Date.now())
    })
  }