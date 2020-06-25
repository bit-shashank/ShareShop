const express=require('express');
const router =express.Router();
const otp_controller=require('../controllers/otp');


router.get('/sendOTP/:mobileNo',otp_controller.send_otp);
router.get('/',otp_controller.get_all);

router.post('/verifyOTP',otp_controller.verify_otp);

router.get('/clear',otp_controller.clear_all);
module.exports=router;