import React,{useState,useContext} from 'react'
import { AuthContext } from "../context/context";
import { Log } from '../context/apicall';
import "./style/authentication.css"
import { Link } from "react-router-dom";
import Alert from '../components/Alert';
import ReactLoading from "react-loading"
import axios from "axios"
const Signin = () => {
  const { dispatch } = useContext(AuthContext);
  const[loading,setloading]=useState(false)
  const [password,setpassword]=useState('')
  const[email,setemail]=useState('')
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const loginfunction=async()=>{
    setloading(true)
    if(email===''||password==='')
    {
        alert("feilds are empty")
        return
      }
      Log({ email, password }, dispatch);
    setloading(false)
  }
  return (
    <>
    {loading ?
      <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="blue" height="100px" width="100px" />
      </div>
      :
    <div className="mnsignup">
    <div className="mnsignup1"> 
    {
      alertshown&&
      <Alert msg={msg}></Alert>
    } 
      <div className='user'>
        <img src={require("../images/user.png")}></img>
      </div>        
      <input onChange={e=>setemail(e.target.value)} type="email" placeholder="email"></input>
      <input onChange={e=>setpassword(e.target.value)} type="password" placeholder="password"></input>
      <button onClick={loginfunction}>Signin</button>
      <span><Link className='link' to="/signup">Donot have account?</Link></span>
      <span><Link className='link' to="/forgotpassword">Forgot password?</Link></span>
    </div>
  </div>
    }
  </>
  )
}

export default Signin