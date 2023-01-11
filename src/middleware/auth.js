const jwt = require("jsonwebtoken")
const authentication = function(req,res,next){
    try{
        let token = req.headers["x-api-key"];
        if(!token) return res.status(400).send({status:false, msg: "token must be present in header"})
        jwt.verify(token,'tailwebs',function(err,decodedToken){
            if(err)return res.status(401).send({status:false, msg: "invalid Token" })
            req.decodedToken = decodedToken
            next()
        })}catch(err){
            return res.status(500).send({ msg: err.message })
        }
    }

module.exports ={authentication}