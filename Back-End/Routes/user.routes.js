import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { getAllUsers , getOneUser , updateUser , deleteUser } from '../Controllers/userController.js'
import { register } from '../Controllers/authController.js';

const router = express.Router();


router.get('/', verifyToken , getAllUsers);
router.get('/oneuser', verifyToken, getOneUser);
router.patch('/update/:id', verifyToken  ,updateUser);
router.delete('/delete/:id', verifyToken  ,deleteUser);

router.post('/register' , register)


export default router