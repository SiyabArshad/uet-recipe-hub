import React,{useState,useEffect,useContext} from 'react'
import Navbar from "../components/Navbar"
import "./style/home.css"
import "../components/componentstyle.css"
import Recipecard from '../components/Recipecard'
import { Link } from "react-router-dom";
import axios from "axios"
import ReactLoading from "react-loading"
import Alert from '../components/Alert'
import { AuthContext } from '../context/context';
const Home = () => {
  const {user,dispatch}=useContext(AuthContext)
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const[loading,setloading]=useState(false)
  const[allrecipes,setallrecipes]=useState([])
  useEffect(()=>{
getdatarecipes()
  },[])
  const searchfunction=(e)=>{
if(e.target.value==='')
{
  getdatarecipes()
}
    setallrecipes(allrecipes.filter((item)=>item.recipename.includes(e.target.value)))
  }
  const getdatarecipes=async()=>{
    setloading(true)
    try{
      const rec=  await axios.get("http://localhost:5000/uet/recipes",{
        headers:{
          token:user.token
        }
      })
      setallrecipes(rec.data.recipes)
      setloading(false)
    }
    catch{
      setloading(false)
      setalertshown(true)
      setmsg("something went wrong")
    }
  }
  return (
    <>
    {loading ?
      <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="blue" height="100px" width="100px" />
      </div>
      :
    <div className='mnhome'>
      <Navbar></Navbar>
      {
      alertshown&&
      <Alert msg={msg}></Alert>
    } 
      <div className='mnsearch'>
        <div>
        <input onChange={(e)=>searchfunction(e)} type="text" placeholder='Search bar....' className='searchbar'></input>  
        </div>
      </div>
      <div className='mnrecipes'>
      {
     allrecipes&&allrecipes.map((item,i)=>{
       return(
        <div key={i} className='fcover'>
    <Link className='link' to={`/recipe/${item.id}`}>
      <img src={item.image}></img>
      </Link>
    </div>
       )
     })
      }
      
      </div>
      <Link className='link' to="/addrecipe">
      <div className='plussymbol'>
      <i class="fa-solid fa-plus"></i>
      </div>
      </Link>
      </div>
    }
    </>
  )
}

export default Home