const express = require('express');
const {createUser, getUser, updateUser, deleteUser, getAllUsers} = require('./services');
const userMidd = require('../../middleware/user');

const router = express.Router();

router.post('/', [userMidd.checkNewUserFields, userMidd.existingEmail], createUser);
//router.post('/admin', [userMidd.checkNewUserFields, userMidd.existingEmail], createUser); //admin user create user with roles 
router.get('/:id', getUser);
router.get('/', getAllUsers)
router.put('/:id', [userMidd.checkUpdateUserFields, userMidd.existingEmailUpdate], updateUser);
router.delete('/:id', deleteUser);

module.exports = router;