const express = require('express');
const router = express.Router();

const { login,register,browse } = require('../controllers/buyerController');

/* GET users listing. */
const authorization = require('../middleware/authenticate');


router.post('/register',register)

router.post('/login',login)

router.get('/browse',authorization,browse)

module.exports = router;
