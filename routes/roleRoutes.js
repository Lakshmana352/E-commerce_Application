const express = require("express");
const { createRole, getRoles } = require("../Controller/roleController");

const router = express.Router();

router.post('/',createRole);
router.get('/',getRoles);

module.exports = router;