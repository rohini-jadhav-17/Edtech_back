// add third party modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create server
const app = express();

// cors origin - where client runs
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-tpe application/json
app.use(bodyParser.json());

// parse html 
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req,res) => {
    res.json({ message: "Welcome to the mern stack application"});
})

const db = require("./models");
db.mongoose
    .connect(db.url, {

    })
    .then(() => {
        console.log("connected to the database")
    })
    .catch(err => {
        console.log("cannot connected to DB!!!")
        process.exit();
    });

// routes
require("./routes/tutorial.routes")(app);
require("./routes/user.routes")(app);

// server listening on port 8081 for incoming requests-client
const PORT = 8081;
app.listen( PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});


/*

{
    "title": "React simple project",
    "description" : "React app using props and state"
}

*/