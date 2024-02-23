import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();

  const onButtonClick = () =>
  {
      setEmailError('')
      setPasswordError('')

      if(email === ''){
        setEmailError('Please enter your email')
      }
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        setEmailError('Invalid Email address ')
      }

      if(password === ''){
        setPasswordError('Please enter your password')
      }

      if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)){
        setPasswordError('Password is weak')
        return
      }


      //Authentication calls
      Loggin();
      // checkAccountExists((accountExist) => {
      //   if(accountExist){
      //     Loggin()
      //   }else{
      //     window.alert('Account does not exist with this email.')
      //   }
      // })
 
  }


  // check if account already exist

  const checkAccountExists = (callback) =>{
    fetch('http://localhost:8000/check-account',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json' 
      },
      body:JSON.stringify({email})
    })
    .then((r) => r.json())
    .then((r) => {
      callback(r?.userExists)
    })

  }
  //Register
  

  //Login

  const Loggin = () => {
       fetch('http://localhost:8000/auth',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
       })

       .then((r) => r.json())
       .then((r) => {
        if(r.message === 'success'){
          localStorage.setItem('user', JSON.stringify({email, token: r.token}));
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate('/')
        }else if (r.message === 'Invalid password'){
          window.alert("Password is incorrect")
        }
        else if(r.message === 'Email is not registered'){
          window.alert("This email is not registered, create a new account")
        }
       })
  }
  
  
  
  
  return (

  <div className="p-3 max-w-lg mx-auto">

  <div className = "main">
    <div className = "title">
        <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
    </div>

  <div className="flex flex-col gap-4">
    
   <div gap-0> 
    
    <div className = "border p-3 rounded-lg">
        <input value={email}
        placeholder="Enter your email"
        onChange={(event) => {setEmail(event.target.value)}} />
    </div>
        <label className="block text-xs text-red-700 text-left">{emailError}</label>

    </div>

    
    <div gap-0>
    
    <div className = "border p-3 rounded-lg">
        <input value={password}
        placeholder="Enter your password"
        onChange={(event) => {setPassword(event.target.value)}}/>
    </div>
        <label className="block text-xs text-red-700 text-left ">{passwordError}</label>
    
    </div>
    
    
    <div className = "bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        <button onClick= {onButtonClick} >Login</button>
    </div>
  </div>

  <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={'/register'}>
              <span className='text-blue-700'>Sign up</span>
            </Link>
          </div>
    

 </div>
 </div>
  )
}

export default Login;