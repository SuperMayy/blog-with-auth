import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const CROSS_DOMAIN = 'https://the-ultimate-api-challenge-v2.herokuapp.com'
const URL = "https://js1.10up.com/wp-json/jwt-auth/v1/token/validate"

const handleAuthValidator = (auth, URL, setTokenIsValid, setAuth) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${CROSS_DOMAIN}/${URL}`, requestOptions)
      .then(response => response.json())
      .then(result => {
          if(result?.data?.status === 200){ 
            setTokenIsValid(true)
          }
        })
      .catch(error => console.error(error));
  }

const ValidateLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const { auth, tokenIsValid, setTokenIsValid} = useAuth()
  const token = auth.token

  const validateToken = async () => {
      await handleAuthValidator(token, URL, setTokenIsValid) 
        if(tokenIsValid && token){
          setIsLoading(false)
        } else{
          navigate('/login', {state: { from:  location}, replace: true})
        }
  }

  useEffect(()=>{  
  validateToken()
  }, [])

  return (
    <>
    {isLoading ? <p>Loading ...</p> : <Outlet />}
    </>
  )
}

export default ValidateLogin