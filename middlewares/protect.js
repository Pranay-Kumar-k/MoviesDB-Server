const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const verifyToken = (token) => {
    return new Promise((resolve,reject) => {

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if(err) {
                return reject(err);
            }
            return resolve(payload);
        })

    })
}

const protect = async(req,res,next) => {
    // We need to get the token from the request
    const bearer = req.headers.authorization

    if(!bearer || !bearer.startsWith("Bearer")) {
        return res.status(401).json({status:"failed", message:"Unauthorized"})
    }

    // We need to jwt.verify the token
    const token = bearer.split("Bearer ")[1].trim();
    console.log(token,"token");

    // We need to retrieve the users data if the user is authorized using bearer token

    let payload;
    try {
        payload = await verifyToken(token);
    }
    catch(err) {
        return res.status(401).json({status:"failed", message:"Invalid Token"});
    }


    let user;
    try{
        user = User.findById(payload.id).lean().exec();
        console.log(user)
    }
    catch (err) {
        return res.status(500).json({status:'failed', message:"something went wrong"})
    }


    if(!user) {
        return res.status(401).json({status:"failed",message:"Invalid token"})
    };

    req.user = user;
    next();
};

module.exports = protect

