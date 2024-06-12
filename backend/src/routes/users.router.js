const express = require('express');
const router = express.Router();
const { getUser, getUsers, putUserRole, deleteUserLastConnection } = require('../controllers/users.controller')

router.get('/', getUsers);
router.get('/:uid', getUser);
router.delete('/inactive', deleteUserLastConnection);
router.put('/:uid/:role', putUserRole);


module.exports = router
