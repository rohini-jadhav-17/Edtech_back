const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../models');
const User = db.user;
const secret_key = db.secret_key;


// register user- signup
exports.signup = async (req, res) =>{
    try{
        // get user input
        const { firstName, lastName, email, password, role} = req.body;
    
        // validate user input
        if(!(email && password && firstName && lastName)){
            res.status(400).send("All input is required");
            return;
        }
    
        // check if user already exist
        // validate if user already exists in database
        const oldUser = await User.findOne({email});
    
        if(oldUser) {
            return res.status(409).send("User already exists. Please login");
        }
    
        // Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);
    
        // create user in our database
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            role: role ? role : 'user',
            isLoggedIn : true
        });
    
        // create token
        // const token = jwt.sign(
        //     { user_id: user._id, email},
        //     secret_key,
        //     {
        //         expiresIn: '5h'
        //     }
        // );
    
        // // save user token
        // user.token = token;
    
        // return new user
        return res.status(201).json(user);
    }
    catch(error){
        console.log(error);
    }
};

// login user
exports.login = async(req,res) =>{
    try{
        // get the user input
        const { email, password } = req.body;

        // validate user input
        if(!(email && password)){
            res.status(400).send("All input is required!!!");
            return;
        }
        
        // validate if user exists in our database
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            // we will create token and send in res - may be require in middleware function
            const token = jwt.sign(
                { user_id: user._id, email},
                secret_key,
                {
                    expiresIn: "5h"
                }
            );
            // save user token
            user.token = token;
            user.isLoggedIn = true;
            try{
                let userUpdated = await User.findOneAndUpdate(user);
                res.status(200).send({
                    "firstName": userUpdated.firstName,
                    "lastName": userUpdated.lastName,
                    "email": userUpdated.email,
                    "isLoggedIn": userUpdated.isLoggedIn,
                    "role": userUpdated.role,
                    "id": userUpdated.id,
                    "token": userUpdated.token
                });
            }
            catch(err){
                res.status(500).send({
                    message: err.message
                });
            }
        }
        res.status(400).send("Invalid credentials!!!!");
        
    }
    catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};

// logout - update isLoggedIn parameter of the user
exports.logout = async (req, res) =>{
    // validate req
    if(!req.body.id){
        res.status(401).send({message: "Please provide user credentials to logout"});
        return;
    }    
    try{
        const id = req.body.id;
        const update = { isLoggedIn : false};

        let data = await User.findByIdAndUpdate(id, update,{});
        res.status(200).send({
            message: "Logged out successfully!!",
            "firstName": data.firstName,
            "lastName": data.lastName, 
            "email": data.email,
            "isLoggedIn": data.isLoggedIn,
            "role": data.role,
            "id": data.id
        });        
    } catch(err) {
        res.status(404).send({
            message: "User Not Found -Logout failed!!"
        });
    }
}; 

// welcoming the login user
exports.welcome = (req, res) =>{
    res.status(200).send("Welcome to EdTech camp!!!");
};
