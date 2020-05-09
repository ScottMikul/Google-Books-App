const router = require("express").Router();
const bookRoutes = require("./bookroutes");

router.use("/books", bookRoutes);

module.exports = router;

