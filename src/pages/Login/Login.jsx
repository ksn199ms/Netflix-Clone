import React, { useState } from 'react'
import './Login.css'

import logo from '../../assets/logo.png'

const Login = () => {

  const [signState,setSignState] = useState("Sign In")

  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>

          {signState === "Sign Up" ? <input type="text" name="username" id="username" placeholder='Your Name' /> : <></> }
          
          <input type="email" name="email" id="email" placeholder='Email' />
          <input type="text" name="password" id="password" placeholder='Password' />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          { signState === "Sign In"  
           ? <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up</span></p> 
           : <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login