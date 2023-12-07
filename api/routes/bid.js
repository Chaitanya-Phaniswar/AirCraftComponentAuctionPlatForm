const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const { createAuction, getAuctions, createBid, deleteAuction, getMybids, complete } = require('../controllers/bidController')

router.post('/createAuction/:id',authenticate,createAuction)

router.get('/auctions',authenticate,getAuctions)
router.post('/createbid/:id',authenticate,createBid)

router.delete('/delete/:id',authenticate,deleteAuction)

router.get('/mybids',authenticate,getMybids)

router.get('/complete/:id',authenticate,complete)
module.exports=router