const auth = require("../middleware/auth");
module.exports = app =>{
    const user = require("../controllers/user.controller");

    let router = require("express").Router();

    // register
    router.post("/signup", user.signup);

    // login
    router.post("/login", user.login);

    // logout
    router.post("/logout", user.logout);

    // welcome
    router.post("/welcome", auth , user.welcome);

    app.use('/api', router);
}