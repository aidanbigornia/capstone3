// require
const express = require("express");
const router = express.Router();
// const User = require("./../model/User");

// controllers
const userController = require("./../controllers/userController")
const auth = require("./../auth")

// VERIFY EMAIL
router.post("/check-email", (req,res)=>{
	userController.checkEmailExists(req.body).then(result => res.send(result));
});

// VERIFY USERNAME
router.post("/check-username", (req,res)=>{
	userController.checkUsernameExists(req.body).then(result => res.send(result));
});

// REGISTER IF EMAIL DOESN'T EXIST
router.post("/register", (req,res)=>{
	// console.log("reqbody", req.body)
	let password ;

	userController.register(req.body, password).then(result => res.send(result));
});

// LOGIN 
router.post("/login", (req,res) => {
	userController.login(req.body).then(result => res.send(result));
});

// GET PROFILE DETAILS
router.get("/profile", auth.verify, (req,res) => {

	const userdata = auth.decode(req.headers.authorization)
	userController.getProfile(userdata.id).then(result => res.send(result))
})

// SETTING USER AS ADMIN
router.put("/:userId/setAdmin", auth.verify, (req, res) => {
	userController.setAdmin(req.params.userId).then(result => res.send(result))
})

// UNSET ADMIN
router.put("/:userId/unsetAdmin", auth.verify, (req, res) => {
	userController.unsetAdmin(req.params.userId).then(result => res.send(result))
})

// DELETE USER
router.delete("/:userId/delete", auth.verify, (req,res) => {
	userController.deleteUser(req.params.userId).then(result => res.send(result))
})

// GET ALL USERS
router.get("/all", auth.verify, (req,res) => {
	userController.getAllUsers().then(result => res.send(result))
})

module.exports = router;