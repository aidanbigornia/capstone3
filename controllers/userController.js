const User = require("./../model/User");
const bcrypt = require("bcrypt")
const auth = require("./../auth");
const express = require("express");
const mongoose = require('mongoose');


module.exports.checkEmailExists = (reqBody) => {

	return User.find({ email: reqBody.email})
	.then((result) => {
		if(result.length !== 0){
			return true;
		} else {
			return false;
		}
	}) 
}

module.exports.checkUsernameExists = (reqBody) => {

	return User.find({ username: reqBody.username})
	.then((result) => {
		if(result.length !== 0){
			return true;
		} else {
			return false;
		}
	}) 
}


module.exports.register = (reqBody) => {

	let newUser = new User ({
			username: reqBody.username,
			email: reqBody.email,
			password: bcrypt.hashSync(reqBody.password, 10),
			mobileNo: reqBody.mobileNo,
	})	

		

		return newUser.save()
		.then((result, error) => {
		if(result){
		checkPass = true;
		return checkPass;
		} else {
		checkPass = false;
		return checkPass;
		}})	
	}

module.exports.login = (reqBody) => {

	return User.findOne({username: reqBody.username})
	.then(result => {
		// console.log("userdata", result)
		if(result == null){
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			if(isPasswordCorrect === true){
				return { access: auth.createAccessToken(result.toObject())}
			} else {
				return false;
			}
		}
	})
}

module.exports.getProfile = (data) => {

	return User.findById(data).then(result => {

		result.password ="************"
		return result;
	})
}

module.exports.setAdmin = (params) => {

	let isNowAdmin = {
		isAdmin: true
	}


	return User.findByIdAndUpdate(params, isNowAdmin, {new:true})
	.then((result, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}

module.exports.unsetAdmin = (params) => {

	let isNotAdmin = {
		isAdmin: false
	}
	
	
	return User.findByIdAndUpdate(params, isNotAdmin, {new:true})
	.then((result, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	}
	)
}


module.exports.deleteUser = (params) => {

	return User.findByIdAndDelete(params)
	.then((result, error) => {
		if(error){
			return error;
		} else {
			return true;
		}
	})
}

module.exports.getAllUsers = () => {

	return User.find()
	.then((result, error) => {
		if(error){
			return error;
		} else {
			return true;
		}
	})
}