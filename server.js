const express = require("express");
const dotenv = require("dotenv");dotenv.config();
require("./model");

const app = express();

app.use(express.json());

app.use('/api/role',require("./routes/roleRoutes"));
app.use('/api/status',require("./routes/statusRoutes"));
app.use('/api/product_type',require("./routes/productTypeRoutes"));
app.use('/api/variant_type',require("./routes/variantTypeRoutes"));

app.use('/api',require("./routes/userRoutes"));
app.use('/api/seller/product',require("./routes/sellerProductRoutes"));
app.use('/api/seller/variant',require("./routes/sellerVariantRoutes"));
app.use('/api/buyer',require("./routes/buyerRoutes"));


app.listen(process.env.PORT,()=>{
  console.log(`Server is running successfully.`);
})

module.exports = app;