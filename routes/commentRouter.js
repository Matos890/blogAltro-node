

const express = require("express");
const commentController = require("../controllers/commentController.js");

const router = express.Router();
router.get("/", commentController.getAllComments)
module.exports = router;
