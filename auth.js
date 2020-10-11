//middleware

const jwt=require("jsonwebtoken");
const SECRET_KEY = "secretkey23456";


exports.fileExtension = (url) => { return url.split('.').pop().split(/\#|\?/)[0] }
exports.verifyToken =(req,res,next)=>{
    const { token } = req.headers
    if (!token) {
        return res.status(403).json({ authorized: false, error: 'Token is required.' })
      }
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) { return res.status(401).send({ authorized: false, error: 'Verification failed or token has expired.' }) }
        req.user = decoded
        next()
      })
}