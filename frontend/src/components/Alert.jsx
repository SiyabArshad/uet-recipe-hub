import React from 'react'
import "./componentstyle.css"
const Alert = (props) => {
  return (
    <div className='mnalert' style={{backgroundColor:"black"}}>
    <span>
        {props.msg}
    </span>
    </div>
  )
}

export default Alert