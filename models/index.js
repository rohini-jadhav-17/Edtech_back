// model defination
const dbConfig = require('../config/db.config');

const mongoose = require("mongoose");

// db url and model
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.secret_key = dbConfig.secret_key;
// get tutorial schema 
db.tutorials = require("./tutorial.model")(mongoose); 

// get user schema
db.user = require("./user.model")(mongoose);
module.exports = db;