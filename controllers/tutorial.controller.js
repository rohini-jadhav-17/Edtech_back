// get the model
const { tutorials } = require('../models');
const db = require('../models');
const Tutorial = db.tutorials;

// create and save new tutorial
exports.create = (req,res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty!!"
        })
        return;
    }

    // create tutorial object
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    })
    // save tutorial
    tutorial
    .save(tutorial)
    .then( data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message: err.message || "Some error occurred while creating tutorial"
        })
    })
};

// retrive objects with condition
exports.findAll = (req,res) => {
    const title = req.query.title;
    let condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {}
    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials!!"
        })
    })
};

// Retrive a single object by id
exports.findOne = (req,res) => {
    const id = req.params.id;
    Tutorial.findById(id)
    .then(data =>{
        if(!data) 
            res.status(404).send(`Not found tutorial with id ${id}`)
        else
            res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving tutorial with id; ${id}`
        })
    })
};

// update an object
exports.update = (req,res) => {
    const id = req.params.id;

    if(!req.body) {
        res.status(400).send({
            message: "Data to update cannot be empty!!"
        })
    }
    Tutorial.findByIdAndUpdate(id, req.body,{})
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot update tutorial with id: ${id}. May be tutorial was not found.`
            })
        } else {
            res.send({
                message:"Tutorial updated successfully!!!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating with tutorial with id: ${id}`
        })
    })
}

// delete an object
exports.delete = (req,res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot delete tutorial with id : ${id}. May be not found.`
            })
        } else {
            res.send({
                message: "Tutorial deleted successfully!!!"
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: `Could not delete tutorial with id ${id}`
        })
    })
};

// delete all objects
exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({})
    .then( data => {
        res.send({
            message: `${data.deletedCount} tutorials deleted successfully!!!`
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occureed while deleting tutorials.."
        })
    })
};

// Find all objects with condition-published
exports.findAllPublished = (req,res) => {
    Tutorial.find({ published: true})
    .then( data => {
        res.send(data)
    })
    .catch( err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials"
        })
    })
}
