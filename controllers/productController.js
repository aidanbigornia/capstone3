const Product = require('./../model/Product');


// ADD PRODUCT 
module.exports.addProduct = (reqBody) => {

	let newProduct = new Product({
		image: reqBody.image,
		name: reqBody.name,
		price: reqBody.price,
		description: reqBody.description
	});

	return newProduct.save().then((result,error)=>{
		if(error){
			return "Product Not Added. Please Check Details First.";
		} else {
			return true;
		}
	})
}

// GET ALL PRODUCTS
module.exports.getAllProducts = () => {

	return Product.find().then(result => {
		return result;
	})
}

// GET ALL ACTIVE PRODUCTS
module.exports.getActiveProducts = () => {
	
	return Product.find({ isActive: true }).then(result => {
		return result;
	})
}

// GET SINGLE PRODUCT
module.exports.getSingleProduct = (params) => {
	
	return Product.findById(params).then(result => {
		return result;
	})
}

// EDIT PRODUCT
module.exports.editProduct = (params, reqBody) => {

	let updatedProduct = {

		image: reqBody.image,
		name: reqBody.name,
		descriptin: reqBody.description,
		price: reqBody.price
	}

	return Product.findByIdAndUpdate(params, updatedProduct, {new:true})
	.then((result,error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}

// ARCHIVE PRODUCT
module.exports.archiveProduct = (params) => {

	let updatedIsActive = {
		isActive: false
	}

	return Product.findByIdAndUpdate(params, updatedIsActive, {new:true})
	.then((result, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}

// UNARCHIVE PRODUCT
module.exports.unarchiveProduct = (params) => {

	let updatedIsActive = {
		isActive: true
	}

	return Product.findByIdAndUpdate(params, updatedIsActive, {new:true})
	.then((result, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}

// DELETE PRODUCT
module.exports.deleteProduct = (params) => {

	return Product.findByIdAndDelete(params).then((result, error)=> {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}