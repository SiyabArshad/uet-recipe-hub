import { useNavigate } from "react-router-dom";
import React,{useState,useEffect,useContext} from 'react'
import "./style/detailrecipe.css"
import Navbar from "../components/Navbar"
import { Link,useParams } from "react-router-dom";
import axios from "axios"
import ReactLoading from "react-loading"
import Alert from '../components/Alert'
import { AuthContext } from '../context/context';
const RecipeDetail = () => {
  let navigate = useNavigate();
  const id=useParams()
  const {user,dispatch}=useContext(AuthContext)
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const[loading,setloading]=useState(false)
  const[recipe,setrecipe]=useState({})
  useEffect(()=>{
getdatarecipes()
  },[id.id])
  const getdatarecipes=async()=>{
    setloading(true)
    try{
      const rec=  await axios.get(`http://localhost:5000/uet/recipe/${id.id}`,{
        headers:{
          token:user.token
        }
      })
      setrecipe(rec.data.recipes[0])
      setloading(false)
    }
    catch{
      setloading(false)
      setalertshown(true)
      setmsg("something went wrong")
    }
  }
  const deleterecipe=async()=>{
    setloading(true)
    try{
      const rec=  await axios.delete(`http://localhost:5000/uet/recipe/${id.id}`,{
        headers:{
          token:user.token
        }
      })
      setalertshown(true)
      setmsg(rec.data.msg)
      setloading(false)
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
    catch{
      setloading(false)
      setalertshown(true)
      setmsg("something went wrong")
    }
  }
  return (
    <>
    {
      loading ?
      <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <ReactLoading type="bubbles" color="blue" height="100px" width="100px" />
      </div>
      :
    <div style={{width:"100%",overflow:"hidden"}}>
    <Navbar></Navbar>
    {
      alertshown&&
      <Alert msg={msg}></Alert>
    }
    <div className='mnresde'>
      <img src={recipe.image}></img>
      <table>
        <tbody>
        <tr>
            <td style={{fontWeight:"bold"}}>Recipe name</td>
            <td>{recipe.recipename}</td>
          </tr>
          <tr>
            <td style={{fontWeight:"bold"}}>Cheff Name</td>
            <td>{recipe.name}</td>
          </tr>
          <tr>
            <td style={{fontWeight:"bold"}}>Cheff Contact</td>
            <td>{recipe.email}</td>
          </tr>
          <tr>
            <td style={{fontWeight:"bold"}}>Description</td>
            <td>
            {recipe.descr}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='upd' style={{display:user.email!=recipe.email&&"none"}}>
        <button className='upbtn'><Link className='link' to={`/update/${id.id}`}>Update</Link></button>
        <button onClick={deleterecipe} className='dtbtn'>Delete</button>
      </div>
    </div>
    </div>
    }
    </>
  )
}

export default RecipeDetail