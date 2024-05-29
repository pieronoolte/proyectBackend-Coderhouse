const express = require('express');
const router = express.Router();
const { getUser, getUsers } = require('../controllers/users.controller')

router.get('/', getUsers);
router.get('/:uid', getUser);

module.exports = router
