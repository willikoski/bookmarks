import { useState } from 'react';
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import styles from './AuthPage.module.scss'

export default function AuthPage (props){
  const [showLogin, setShowLogin] = useState(true)
  return(
   <>
     <button onClick={() => setShowLogin(!showLogin)}>{!showLogin? 'Already Have An account. Click Here To Sign In': 'New Here. Click Here Sign Up'}</button>
     { !showLogin ? <SignUpForm signUp={props.signUp}/> : <LoginForm login={props.login}/>}    
   </>
  )
}