export default function restaurantMiddleware(req, res, next) {
     if(req.user && req.user.role === 'restaurant') {
          next();
     }
     else{
          throw new UnauthenticatedError('You are not authorized to access this route')
     }
    
     
}