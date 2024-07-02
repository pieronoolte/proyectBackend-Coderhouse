const express = require('express');
const router = express.Router();
const { getUser, getUsers, putUserRole, deleteUserLastConnection } = require('../controllers/users.controller')
const {validatorAdmin} = require('../middlewares/validatorRole.handler')

router.get('/', validatorAdmin(), getUsers);
router.get('/:uid', validatorAdmin(), getUser);
router.delete('/inactive', validatorAdmin(), deleteUserLastConnection);
router.put('/:uid/:role', validatorAdmin(), putUserRole);


module.exports = router
