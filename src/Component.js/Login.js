import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();

  function onButtonClick()
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
        setPasswordError('Invalid password')
      }
 
  }
  
  
  
  
  
  
  
  
  return (
//     <div className={'mainContainer'}>
//     <div className={'titleContainer'}>
//       <div>Login</div>
//     </div>
//     <br />
//     <div className={'inputContainer'}>
//       <input
//         value={email}
//         placeholder="Enter your email here"
//         onChange={(ev) => setEmail(ev.target.value)}
//         className={'inputBox'}
//       />
//       <label className="errorLabel">{emailError}</label>
//     </div>
//     <br />
//     <div className={'inputContainer'}>
//       <input
//         value={password}
//         placeholder="Enter your password here"
//         onChange={(ev) => setPassword(ev.target.value)}
//         className={'inputBox'}
//       />
//       <label className="errorLabel">{passwordError}</label>
//     </div>
//     <br />
//     <div className={'inputContainer'}>
//       <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
//     </div>
//   </div>

  <div className = "main">
    <div className = "title">
        <div className="log-title">Login</div>
    </div>
    <div className = "input">
        <input value={email}
        placeholder="Enter your email"
        onChange={(event) => {setEmail(event.target.value)}} />
        <label className="email-error">{emailError}</label>
    </div>
    <div className = "input">
        <input value={password}
        placeholder="Enter your password"
        onChange={(event) => {setPassword(event.target.value)}}/>
        <label className="pass-error">{passwordError}</label>
    </div>
    <div className = "login-button">
        <button onClick= {onButtonClick} >Login</button>
    </div>


    
  </div>
  )
}

export default Login;