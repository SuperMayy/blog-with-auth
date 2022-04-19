import React from 'react'
import { useRef, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const CROSS_DOMAIN = 'https://the-ultimate-api-challenge-v2.herokuapp.com'
const LOGIN_URL = 'https://js1.10up.com/wp-json/jwt-auth/v1/token'

const Login = () => {
  const { setAuth, setTokenIsValid } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.from?.pathName || "/"

  const userRef = useRef()
  const errRef = useRef()

  const [formData, setFormData] = useState(() => ({ username: '',password: ''}))
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    userRef.current.focus()

  }, [])

  useEffect(() => {

    setErrMsg('')
  }, [formData])


  const handleLogin = async(payload) => {
    const loginHeaders = new Headers();
    loginHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
      method: 'POST',
      headers: loginHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow'
    };
    
    fetch(`${CROSS_DOMAIN}/${LOGIN_URL}`, requestOptions)
      .then(response => {
          if(!response.ok){
            setErrMsg('Incorrect username or password, please try again.')
          } 
          return response.json()
        })
      .then(result => {
          const token = result?.token
          setAuth({...formData, token})
          setTokenIsValid(true)
          if(token){
            navigate(from, {replace: true})
          }

        })
      .catch(error => {
          if(error?.response?.status === 400){
            setErrMsg('Server Error, Please Contact Admin')
          }
          errRef.current.focus()
          throw Error(error) 
        });

        setFormData({ username: '',password: ''})
  }

  const updateUserName = (e) => {
    setFormData(prevSate => {
        return {
            ...prevSate,
            username: e.target.value
        }
    })
  }

  const updatePassword = (e) => {
    setFormData(prevSate => {
        return {
            ...prevSate,
            password: e.target.value
        }
    })
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      await handleLogin(formData)
  }

  return (
       <div>
        <h1>
          Login
        </h1>
        <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>  
        <div className="login">
            {/* Connect this form with the WP JWT API. */}
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    ref={userRef} 
                    id="username" 
                    type="text" 
                    name="username" 
                    onChange={updateUserName}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    onChange={updatePassword}
                    />
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
      </div>
  )
}

export default Login