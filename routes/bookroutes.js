const router = require("express").Router();
const booksController = require("../controllers/bookctr");

console.log(booksController);

router.route("/save")
    .post(booksController.create)

router.route("/delete/:id")
    .delete(booksController.remove);

router.route("/")
    .get(booksController.findAll);

module.exports = router;