import React,{useState} from 'react'
import "./style/authentication.css"
import { Link } from "react-router-dom";
import axios from "axios"
import ReactLoading from "react-loading"
import Alert from '../components/Alert'
const Forgot = () => {
  const[loading,setloading]=useState(false)
  const[email,setemail]=useState('')
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const forgotfunction=async()=>{
    setloading(true)
    if(email==='')
    {
        alert("feilds are empty")
        return
      }
  const reguser=  await axios.post("http://localhost:5000/uet/forgotpassword",{
      email 
       })
    setmsg(reguser.data.msg)
    setalertshown(true)
    setloading(false)
    setTimeout(() => {
      setalertshown(false)
    }, 3000);
  }
  return (
    <>
    {
      loading ?
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
      <button onClick={forgotfunction}>Send Email</button>
    </div>
  </div>
    }

  </>
  )
}

export default Forgot