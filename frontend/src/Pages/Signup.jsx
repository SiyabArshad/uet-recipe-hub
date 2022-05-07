import ReactLoading from "react-loading"
import React,{useState} from 'react'
import "./style/authentication.css"
import { Link } from "react-router-dom";
import Alert from '../components/Alert';
import axios from "axios"
const Signup = () => {
  const[loading,setloading]=useState(false)
  const [name,setname]=useState('')
  const [password,setpassword]=useState('')
  const[email,setemail]=useState('')
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const registerfunction=async()=>{
    setloading(true)
    if(name===''||email===''||password==='')
    {
        alert("feilds are empty")
        return
      }
  const reguser=  await axios.post("http://localhost:5000/uet/signup",{
      name,email,password
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
    <div className="mnsignup">
      <div className="mnsignup1">
      {
      alertshown&&
      <Alert msg={msg}></Alert>
    } 
        <div className='user'>
          <img src={require("../images/user.png")}></img>
        </div>        
        <input onChange={e=>setname(e.target.value)} type="text" placeholder="username"></input>
        <input onChange={e=>setemail(e.target.value)} type="email" placeholder="email"></input>
        <input onChange={e=>setpassword(e.target.value)} type="password" placeholder="password"></input>
        <button onClick={registerfunction}>Signup</button>
        <span><Link className='link' to="/login">already have account?</Link></span>
      </div>
    </div>
    }
</>
)
}

export default Signup

