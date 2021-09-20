// WILL BE USED EVERY LOGIN AND AUTHENTICATION

const jwt = require("jsonwebtoken")
const secret = "software-engineer";

module.exports.createAccessToken = (user) => {
	// console.log("User sa auth",user)
	const data = { 
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin,
		username: user.username
	}
	// console.log("Data from auth", data)
	return jwt.sign(data, secret, {})
}

module.exports.verify = (req,res, next) => {

	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		token = token.slice( 7, token.length);

		return jwt.verify(token, secret, (error,data)=>{
			if(error){
				return res.send({auth:"failed"})
			} else {
				next();
			}
		})
	}
}

module.exports.decode = (token) => {

	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data)=> {
			if(error){
				return null;
			} else {
				return jwt.decode(token, {complete:true}).payload
			}
		})
	}
}