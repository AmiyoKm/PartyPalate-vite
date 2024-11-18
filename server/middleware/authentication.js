import User from '../model/user.js'
import UnauthenticatedError from '../errors/unauthenticate.js'
import jwt from 'jsonwebtoken'
  const authenticationMiddleware = async(req,res,next) =>{
    const authHeader = req.headers.authorization
    //console.log(authHeader)

    if(!authHeader && !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Error')
    }
    const token = authHeader.split(' ')[1]
    //console.log(token)
    try {
      const payload =   jwt.verify(token , process.env.JWT_SECRET)
      const user = await User.findById(payload.userId);
      if (!user) {
        throw new UnauthenticatedError('User not found')
      }
      req.user = user
      //console.log(req.user);
      
      next()
    } catch (error) {
        throw new UnauthenticatedError('Wrong Token')
    }
}
export default authenticationMiddleware