const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        status:"error",
        message: "Trop de requetes, reessayez plus tard "
    }
});

module.exports = apiLimiter;