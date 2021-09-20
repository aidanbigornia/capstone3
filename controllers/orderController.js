const Order = require("./../model/Order");
const Product = require("./../model/Product");
const User = require("./../model/User");
const auth = require("./../auth");

// CREATE CART PER USER
module.exports.addCart = (data) => {
	let newOrder = new Order({
		userId: data.id,
		email: data.email,
		username: data.username
	});

	return Order.find({email: data.email}).then((result) => {
		if (result.length < 1) {
      		return newOrder.save().then((result, error) => {
       			if (error) {
          			return false;
        		} else {
         			return true;
        		}
      		});
	    } else {
	      return false;
	    }
  });
};


module.exports.createOrder = (params, data, reqBody) => {
  // console.log(data)
  return Order.findOne({ userId: data.id }).then((cart) => {
    // console.log("cart",cart)
    if (cart !==  null) {
    //   Order.findOne({productId: params})
    //     let order = cart.orders;
    //     console.log("order",order)
    //     console.log(order.length)
    //     console.log(params)
    //     for(x=0 ; x < order.length ; x++){
    //       if(order[x].productId == params){
    //         order[x].quantity += parseInt(reqBody.quantity);
    //         order[x].subtotal += parseInt(reqBody.quantity) + order[x].quantity) * order[x].price ;
    //         break;
    //       } else {
    //         console.log("hindi ito")
    //       }
      // }
      return Product.findOne({ _id: params }).then((result) => {
        let prod = reqBody.quantity * result.price;
        cart.orders.push({
          productId: result._id,
          name: result.name,
          price: result.price,
          quantity: reqBody.quantity,
          subtotal: prod,
        });
        cart.totalPrice += prod;
      
        return cart.save().then((result, error) => {
          if (error) {
            return false;
          } else {
            // console.log(cart)
            return true;
          }
        });
      })
    } else {
      console.log("wala pa cart")
      return false;
    }
  });
};

// Retrieve User Orders
module.exports.retrieveOrder = (data) => {
  // console.log(data)
  // console.log(data.email)
  return Order.findOne({email: data.email})
  .then(result => {
      return result;
  })
}
  
// Get All Orders
module.exports.allOrders = (data) => {
  // console.log(data)
  // console.log(data.email)
  return Order.find()
  .then(result => {
      return result;
  })
}


// Remove Order from Cart
module.exports.removeOrder = (params, data) => {
  console.log(data,"data sa remove order")
  // let list = orders.orders;
  return Order.findOne({email: data.email})
  .then(result => {
    console.log(result,"result from findOne")
    let list = result.orders;
    const orderlist = list.find(({productId}) => productId == params);
    console.log(orderlist);
})
}