const express=require("express")
const router=express.Router()
const verify=require("../middlewares/verify")
const {getallrecipe,getsinglerecipe,addrecipe,updaterecipe,deleterecipe}=require("../controller/Recipe")
//addrecipe route
router.post("/addrecipe",verify,addrecipe)
router.get("/recipes",verify,getallrecipe)
router.get("/recipe/:id",verify,getsinglerecipe)
router.put("/recipe/:id",verify,updaterecipe)
router.delete("/recipe/:id",verify,deleterecipe)
//export all
module.exports=router