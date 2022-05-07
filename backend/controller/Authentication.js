const connection=require("../config/connection")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')
const nodemailer = require("nodemailer");
const signup=(req,res)=>{
  connection.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${connection.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).json({
          msg: 'This user is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              msg: err
            });
          } else {
            const token = jwt.sign({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            },
            process.env.SECKEY, {
              expiresIn: '1h'
            }
          );

          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.bemail,
              pass: process.env.bpass,
            },
          });
          transporter.sendMail({
            from: process.env.bemail, // sender address
            to: req.body.email, // list of receivers
            subject: `Hello ✔ ${req.body.email}`, // Subject line
            text: "Here is Your activation Link click on link activation Token will expire in 1 hour", // plain text body
            html: `<a href=http://localhost:3000/activation/${token}>Confirm Your Account</a>`, // html body
          },(err,succ)=>{
            if(err)
            {
              return res.status(500).json({
                msg:err + "Email not sent"
              });
            }
            else
            {
              res.status(200).json({
                msg: "Confirmation Email sent Sucessfully"
              });
            }
          });
          
          }
        });
      }
    }
  );


}


const activation=(req,res)=>{
            connection.query(
              `INSERT INTO users (name, email, password) VALUES ('${req.user.name}', ${connection.escape(
                req.user.email
              )}, ${connection.escape(req.user.password)})`,
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'The user has been registerd with us!'
                });
              }
            );

}


const login=(req,res)=>{
  connection.query(
    `SELECT * FROM users WHERE email = ${connection.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).json({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).json({
          msg: 'email or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).json({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].name,
                userId: result[0].id,
                email:result[0].email
              },
              process.env.SECKEY, {
                expiresIn: '7d'
              }
            );
            const {id,name,email}=result[0]
            const loginuser={id,name,email,token}
            return res.status(200).json({
              msg: 'Logged in!',
              user: loginuser
            });
          }
          return res.status(401).json({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
}
const forgotpassword=async(req,res)=>{
  connection.query(
    `SELECT * FROM users WHERE email = ${connection.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).json({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).json({
          msg: 'no account found with this email'
        });
      }
      const temppassword=Math.floor(100000 + Math.random() * 900000)
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(`${temppassword}`, salt, (err, hashed) => {
          if(err){
            return res.status(500).json({
              msg: err +" something went wrong in hashing"
            });
          }
          connection.query(`UPDATE users SET password = ${connection.escape(hashed)} WHERE email = ${connection.escape(req.body.email)}`,(err,results)=>{
            if(err){
              return res.status(500).json({
                msg: err +" something went wrong in updating user"
              });
            }
            else
            {
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.bemail,
                  pass: process.env.bpass,
                },
              });
              transporter.sendMail({
                from: process.env.bemail, // sender address
                to: req.body.email, // list of receivers
                subject: `Hello ✔ ${req.body.email}`, // Subject line
                text: "Your new Account Password is given below", // plain text body
                html: `<b>${temppassword}</b>`, // html body
              },(err,succ)=>{
                if(err)
                {
                  return res.status(500).json({
                    msg:err + "Email not sent"
                  });
                }
                else
                {
                  res.status(200).json({
                    msg: "Email sent Sucessfully"
                  });
                }
              });            
            }
          })
 
      });
                 }

    )   
}

module.exports={
  signup,login,forgotpassword,activation
}