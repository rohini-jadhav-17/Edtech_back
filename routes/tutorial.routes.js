
module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller");

    let router = require("express").Router();

    // create a new tutorial
    router.post("/", tutorial.create);

    // retrive all tutorials
    router.get("/", tutorial.findAll);

    // retrive all publish tutorials
    router.get("/published", tutorial.findAllPublished);

    // retrive a single tutorial by id
    router.get("/:id", tutorial.findOne);

    // update tutorial with id
    router.put("/:id", tutorial.update);

    // delete a tutorial with id
    router.delete("/:id", tutorial.delete);

    // delete all tutorials
    router.delete("/", tutorial.deleteAll);

    app.use('/api/tutorials', router);
};