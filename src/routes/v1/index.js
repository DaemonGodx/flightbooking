const express = require('express');
const router = express.Router();
const bookingcontroller=require('../../controllers/booking_contoller');
router.post('/booking',bookingcontroller.create);
module.exports = router;

