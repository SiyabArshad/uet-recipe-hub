import React,{useState,useContext} from 'react'
import "./style/addrecipe.css"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";
import axios from "axios"
import ReactLoading from "react-loading"
import Alert from '../components/Alert'
import { AuthContext } from '../context/context';
import { getStorage,ref,getDownloadURL,uploadBytesResumable ,deleteObject } from "firebase/storage"
import app from "../firebase"
const AddRecipe = () => {
  const storage=getStorage(app)
  const {user,dispatch}=useContext(AuthContext)
  const[loading,setloading]=useState(false)
  const[recipename,setrecipename]=useState('')
  const[desc,setdesc]=useState('')
  const[file1,setfile1]=useState('')
  const[img,setimg]=useState('')
  const[preview,setpreview]=useState('')
  const[alertshown,setalertshown]=useState(false)
  const[msg,setmsg]=useState('')
  const addrecipefunction=()=>{
    setloading(true)
    if(recipename===''||desc==='')
    {
        alert("feilds are empty")
        return
      }
      uploadimage()
  }
  const uploadimage=async()=>{
    try{
      if(!file1)
      {
        setalertshown(true)
        setmsg("no image selected")
        // Unknown error occurred, inspect error.serverResponse
        setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        },2000);   
      }
      else if(file1.size>1e+6)
      {
        setalertshown(true)
        setmsg("image size should less than 1 mb")
        // Unknown error occurred, inspect error.serverResponse
        setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        },2000);
      }
      else{
        setloading(true)
        const metadata = {
        contentType: 'image/jpeg'
      };
      const storageRef = ref(storage, 'recipes/' + file1.name);
      const uploadTask = uploadBytesResumable(storageRef, file1, metadata);
      uploadTask.on('state_changed',
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
    }, 
    (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        setalertshown(true)
        setmsg("something went wrong")
        // Unknown error occurred, inspect error.serverResponse
        setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        },2000);
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        setalertshown(true)
        setmsg("something went wrong")
        // Unknown error occurred, inspect error.serverResponse
        setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        },2000);
        // User canceled the upload
        break;
    
      // ...
    
      case 'storage/unknown':
        setalertshown(true)
        setmsg("something went wrong")
        // Unknown error occurred, inspect error.serverResponse
        setloading(false)
        setTimeout(() => {
          window.location.reload(true)
        },2000);
        break;
    
    }
    }, 
    () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setimg(downloadURL)
      axios.post("http://localhost:5000/uet/addrecipe",{
      name:user.name,
      email:user.email,
      img:downloadURL,
      recipe:recipename,
      desc:desc,
      token:user.token   
       }).then(()=>{
         setloading(false)
         setalertshown(true)
         setmsg("Reciped added!")
       }).catch((e)=>{
        setloading(false)
        setalertshown(true)
        setmsg("Try again later!")
      })
      
    });
    }
    );
        } 
  }
  catch(e)
  {
    setloading(false)
    setalertshown(true)
    setmsg("something went wrong")
    setTimeout(() => {
      window.location.reload(true)
    },2000);
  }
  }
  return (
    <>
    {loading ?
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
      <div className='mnadrecp'>
       {preview && <img src={preview}></img>}
        <input onChange={(e)=>{
          setfile1(e.target.files[0])
          const objurl=URL.createObjectURL(e.target.files[0])
          setpreview(objurl)
          e.target.value=""
        }} type="file" required></input>
        <input type="text"  disabled value={user.name}></input>
        <input type="email"  disabled value={user.email}></input>
        <input onChange={e=>setrecipename(e.target.value)} type="text" placeholder='Recipe name' required></input>
        <textarea onChange={e=>setdesc(e.target.value)} placeholder='Description'></textarea>
        <button onClick={addrecipefunction}>Add</button>
      </div>
    </div>
    }
    </>
  )
}

export default AddRecipe