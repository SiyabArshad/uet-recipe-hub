const jwt = require("jsonwebtoken");
function verify(req, res, next) {
  const authHeader = req.body.token || req.query.token || req.headers["token"];;
  if (authHeader) {
    const token = authHeader
    jwt.verify(token, process.env.SECKEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid!"+err);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;