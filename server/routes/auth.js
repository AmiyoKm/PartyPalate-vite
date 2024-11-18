import express from 'express'
import { login, registration ,getAllUsers } from '../controller/auth.js'
const authRouter = express.Router()
console.log('auth router');

authRouter.route('/login').post(login).get(getAllUsers)
authRouter.route('/register').post(registration)
authRouter.route('/profile/:id').get()
authRouter.route('/update/:id').patch()


export default authRouter