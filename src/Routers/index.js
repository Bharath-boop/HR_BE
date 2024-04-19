import express from 'express'
import UserRoute from './user.js'
const router = express.Router()

router.use('/user', UserRoute)


export default router