// require
const express = require("express");
const router = express.Router();
// const User = require("./../model/User");

// controller
const orderController = require('./../controllers/orderController');
const auth = require('./../auth');


// CREATE CART
router.post("/add-cart", auth.verify, (req,res) => {

	let data = auth.decode(req.headers.authorization);
	console.log(data, "data")
	orderController.addCart(data).then(result => console.log(result))
})

// ADD ORDER TO CART
router.post("/:productId/add-to-cart", auth.verify, (req,res) => {
    let data = auth.decode(req.headers.authorization);

    orderControllers.createOrder(req.params.productId, data, req.body).then(result => res.send(result))
})

// SHOW CART
router.get("/:userId/show-cart", auth.verify, (req,res)=> {
    let data = auth.decode(req.headers.authorization);

    orderControllers.retrieveOrder(data, req.params.userId).then(result => res.send(result));
})

// SHOW ORDERS OF EVERYONE(ADMIN ONLY)
router.get("/all", auth.verify, (req,res)=> {
    let data = auth.decode(req.headers.authorization);

    orderControllers.allOrders(data).then(result => res.send(result));
})

// REMOVE FROM CART
router.delete("/:productId/remove-from-cart", auth.verify, (req,res) => {
    let data = auth.decode(req.headers.authorization);

    orderControllers.removeOrder(req.params.productId, data).then(result => res.send(result))
})

module.exports = router;