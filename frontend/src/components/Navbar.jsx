import React,{useContext} from 'react'
import "./componentstyle.css"
import { Link } from "react-router-dom";
import { logout} from "../context/action.js";
import { AuthContext } from '../context/context.js';
const Navbar = () => {
  const {user,dispatch}=useContext(AuthContext)
  return (
    <div className='mnnav'>
      <h2><Link className='link' to="/">Uet Recipe Hub</Link></h2>
      <div>
      <h3>{user.name}</h3>
      <h3 className='logout' onClick={() => dispatch(logout())}>Logout</h3>
      </div>
      
    </div>
  )
}

export default Navbar