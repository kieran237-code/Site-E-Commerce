const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes API

app.use("/api/categories" , categoryRoutes);
app.use("/api/products" , productRoutes);
module.exports = app;