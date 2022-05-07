const connection=require("../config/connection")

const addrecipe=(req,res)=>{
if(req.user.userId&&req.user.username==req.body.name)
{
    connection.query( `INSERT INTO recipes (name, email, image,descr,recipename) VALUES ('${req.body.name}', ${connection.escape(
        req.body.email
      )}, ${connection.escape(req.body.img)},${connection.escape(req.body.desc)},${connection.escape(req.body.recipe)})`,(err,result)=>{
        if (err) {
            return res.status(400).json({
              msg: err
            });
          }
          return res.status(201).send({
            msg: 'Recipe added!'
          });
      })
}
else
{
    res.status(500).json({
        msg:"Try again later"
    })
}
}

const getallrecipe=(req,res)=>{
    if(req.user.userId)
    {
        connection.query( 'SELECT * FROM recipes',(err,result)=>{
            if (err) {
                return res.status(400).json({
                  msg: err
                });
              }
              return res.status(201).send({
                msg: 'Recipe fetched!',
                recipes:result
              });
          })
    }
    else
    {
        res.status(500).json({
            msg:"Try again later"
        })
    }
}

const getsinglerecipe=(req,res)=>{
    const respid=req.params.id
    if(req.user.userId)
    {
        connection.query( `SELECT * FROM recipes where id=${respid}`,(err,result)=>{
            if (err) {
                return res.status(400).json({
                  msg: err
                });
              }
            if(!result.length)
          {
            return res.status(404).json({
                msg: "invalid id"
              });
          }
              return res.status(201).send({
                msg: 'Recipe fetched!',
                recipes:result
              });
          })
    }
    else
    {
        res.status(500).json({
            msg:"Try again later"
        })
    }
}

const updaterecipe=(req,res)=>{
    const respid=req.params.id
    connection.query( `SELECT * FROM recipes where id=${respid}`,(err,result)=>{
        if (err) {
            return res.status(400).json({
              msg: err
            });
          }
          if(!result.length)
          {
            return res.status(404).json({
                msg: "invalid id"
              });
          }
          if(req.user.userId&&req.user.username==result[0].name&&req.user.email==result[0].email)
          {
           connection.query(`UPDATE recipes SET image=${connection.escape(req.body.img)},descr=${connection.escape(req.body.desc)} ,recipename=${connection.escape(req.body.recipe)}  WHERE id = ${respid}`,(err,resu)=>{
            if (err) {
                return res.status(400).json({
                  msg: err
                });
              }
              res.status(200).json({
                msg: "Recipe updated"
              });
           }) 
           
          }
          else
          {
              res.status(500).json({
                  msg:"Try again later"
              })
          }
      })

}

const deleterecipe=(req,res)=>{
    const respid=req.params.id
    connection.query( `SELECT * FROM recipes where id=${respid}`,(err,result)=>{
        if (err) {
            return res.status(400).json({
              msg: err
            });
          }
          if(!result.length)
          {
            return res.status(404).json({
                msg: "invalid id"
              });
          }
          if(req.user.userId&&req.user.username==result[0].name&&req.user.email==result[0].email)
          {
           connection.query(`DELETE FROM recipes WHERE id = ${respid}`,(err,resu)=>{
            if (err) {
                return res.status(400).json({
                  msg: err
                });
              }
              res.status(200).json({
                msg: "Recipe deleted"
              });
           }) 
          }
          else
          {
              res.status(500).json({
                  msg:"Try again later"
              })
          }
      })

}

module.exports={addrecipe,getallrecipe,getsinglerecipe,updaterecipe,deleterecipe}