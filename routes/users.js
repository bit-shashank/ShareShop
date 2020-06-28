const express=require('express');
const router =express.Router();
const user_controller=require('../controllers/user');
const checkAuth = require('../middleware/check_auth');



router.get('/', checkAuth,user_controller.get_all_users);

router.get('/:id',checkAuth,user_controller.get_user);

router.post('/login',user_controller.login);

router.post('/signup',user_controller.signup);

router.delete('/:userId',checkAuth,user_controller.delete);



module.exports=router;