import express from 'express'
import UserController from '../controllers/user.js'
import auth from '../Utils/auth.js'
const router=express.Router()

router.get('/',auth.autherization,auth.adminGurd,UserController.GET_ALL_USER)
router.get('/:id',UserController.GET_USER_BY_ID)
router.post('/create_employee',UserController.CREATE_USER)
router.post('/login',UserController.LOGIN)
router.delete('/:id',UserController.DELETE_USER)
router.put('/edit/:id',UserController.EDIT_USER)

export default router