// require
const express = require("express");
const router = express.Router();
const auth = require('./../auth')

// controllers
const productController = require('./../controllers/productController')

// ADD PRODUCT
router.post("/add", auth.verify, (req,res) => {
	productController.addProduct(req.body).then(result => res.send(result));
});

// RETRIEVE PRODUCTS
router.get("/all", auth.verify, (req,res) => {
	productController.getAllProducts().then(result => res.send(result))
});

// RETRIEVE ALL ACTIVE PRODUCTS
router.get("/active", auth.verify, (req,res) => {
	productController.getActiveProducts().then(result => res.send(result))
});

// GET SINGLE PRODUCT
router.get("/:productId", (req,res) => {
	productController.getSingleProduct(req.params.productId).then(result => res.send(result));
});

// UPDATE PRODUCT
router.put("/:productId/edit", auth.verify, (req, res) => {
	productController.editProduct(req.params.productId, req.body).then(result => res.send(result));
});



// ARCHIVE PRODUCT
router.put("/:productId/archive", (req,res) => {
	productController.archiveProduct(req.params.productId).then(result => res.send(result));
});

// UNARCHIVE PRODUCT
router.put("/:productId/unarchive", (req,res) => {
	productController.unarchiveProduct(req.params.productId).then(result => res.send(result));
});

// DELETE PRODUCT 
router.delete("/:productId/delete", (req, res)=> {
	productController.deleteProduct(req.params.productId).then(result => res.send(result));
});


module.exports = router;