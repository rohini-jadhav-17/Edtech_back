const auth = require("../middleware/auth");
module.exports = app =>{
    const user = require("../controllers/user.controller");

    let router = require("express").Router();

    // register
    router.post("/register", user.register);

    // login
    router.post("/login", user.login);

    // welcome
    router.post("/welcome", auth , user.welcome);

    app.use('/api', router);
}