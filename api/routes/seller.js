const express = require('express');
const router = express.Router();
const {getInventory, addItem, deleteItem, register,login }= require('../controllers/sellerController')
const authorization = require('../middleware/authenticate');

router.post('/register',register)

router.post('/login',  login)

router.get('/inventory',authorization,getInventory)

router.post('/additem',authorization,addItem)

router.delete('/delete/:id',authorization,deleteItem)

module.exports = router;
