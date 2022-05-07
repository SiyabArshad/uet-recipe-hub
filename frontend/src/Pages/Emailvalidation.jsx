import React,{useState} from 'react'
import "./style/authentication.css"
import Alert from '../components/Alert'
import { Link,useParams } from "react-router-dom";
import axios from "axios"
import ReactLoading from "react-loading"
const Emailvalidation = () => {
  const token=useParams()
  const privatetoken=token.id
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const[loading,setloading]=useState(false)
  
  const Activationfunction=async()=>{
    setloading(true)
  const reguser=  await axios.post("http://localhost:5000/uet/activation",{
    token:privatetoken
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
   {loading ?
      <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="blue" height="100px" width="100px" />
      </div>
      :
    <div style={{width:"100%",overflow:"hidden"}}>
    <div className="mnsignup">
    <div className="mnsignup1"> 
    {
      alertshown&&
      <Alert msg={msg}></Alert>
    } 
      <div className='user'>
        <img src={require("../images/user.png")}></img>
      </div>        
      <label style={{color:"#fff",margin:".5rem 0rem"}}>Click button to confirm your Registration.</label>
      <button onClick={Activationfunction}>Click me</button>
    </div>
  </div>
  </div>
  }
  </>
  )
}

export default Emailvalidation