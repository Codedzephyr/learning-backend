// creating custom middleware
const logRequests = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); //as we learnt before next passes control to the next middleware or route handler
}

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'your-secret-token') {
      next(); 
    } else {
      res.status(401).json({ error: 'Unauthorized' }); 
    }
  };
  
  module.exports = {
    logRequests,
    authenticate,
  };