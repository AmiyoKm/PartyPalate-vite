import UnauthenticatedError from "../errors/unauthenticate";

export default function customerMiddleware(req, res, next) {
    if(req.user && req.user.role === 'customer') {
        next();
    }
    else{
        throw new UnauthenticatedError('You are not authorized to access this route')
    }
   
    
}