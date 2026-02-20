const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan"); 

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const adminProduct = require("./routes/adminProductRoute");

const ProdRoutes= require("./routes/ProdRoutes")
const errorMiddleware = require("./middlewares/errorMiddleware");
const apiLimiter = require("./middlewares/rateLimiteMiddleware");
const app = express();

app.use(cors(
    {
        // empece les appels depuis les sites inconnues
        origin: process.env.CLIENT_URL,
        methods:["GET" , "POST" , "PUT" , "DELETE"],
        credentials:true
    }

));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes API
app.use("/api", apiLimiter);
app.use("/api/categories" , categoryRoutes);
app.use("/api/products" , productRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/admin", adminProduct);
app.use("/api/product" , ProdRoutes)
app.use(errorMiddleware);
module.exports = app;