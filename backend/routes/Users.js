const express=require("express")
const router=express.Router()
const {signup,login,forgotpassword,activation}=require("../controller/Authentication")
const verify=require("../middlewares/verify")
//signup route
router.post("/signup",signup)
//activation route
router.post("/activation",verify,activation)
//login route
router.post("/login",login)
//forgot password route
router.post("/forgotpassword",forgotpassword)

//export all
module.exports=router