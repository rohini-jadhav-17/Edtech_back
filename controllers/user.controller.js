const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../models');
const User = db.user;
const secret_key = db.secret_key;


// register user- signup
exports.register = async (req, res) =>{
    try{
        // get user input
        const { firstName, lastName, email, password} = req.body;
    
        // validate user input
        if(!(email && password && firstName && lastName)){
            res.status(400).send("All input is required");
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
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword
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
        res.status(201).json(user);
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
            return res.status(200).json(user);
        }
    return res.status(400).send("Invalid credentials!!!!");
    }
    catch(err){
        console.log(err);
    }
};

// welcoming the login user
exports.welcome = (req, res) =>{
    res.status(200).send("Welcome to EdTech camp!!!");
};
