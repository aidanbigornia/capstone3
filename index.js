const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// PORT
const PORT = process.env.PORT || 3000;
// https://bookish-mnl.herokuapp.com/
const app = express();

// for routes
let userRoutes = require("./routes/userRoutes");
let productRoutes = require("./routes/productRoutes");
let orderRoutes = require("./routes/orderRoutes");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// mongoose.connect
mongoose.connect('mongodb+srv://aidanbigornia:Big0rnia@cluster0.e3n78.mongodb.net/ecomm?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}
).then(() => console.log('Connected to Database'))
.catch((error) =>console.log(error));

// routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// listen
app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`)
})