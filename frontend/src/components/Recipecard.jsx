import React from 'react'
import "./componentstyle.css"
import { Link } from "react-router-dom";

const Recipecard = () => {
  return (
    
    <div className='fcover'>
    <Link className='link' to="/recipe/326623">
      <img src={require('../images/foodcover.jpg')}></img>
      </Link>
    </div>
  )
}

export default Recipecard