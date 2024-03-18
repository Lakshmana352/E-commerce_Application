const express = require("express");
const {createStatus, getStatus} = require("../Controller/statusController");

const router = express.Router();

router.post('/',createStatus);
router.get('/',getStatus);

module.exports = router;