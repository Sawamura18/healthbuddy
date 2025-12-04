const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // contains id, role
    next();
  } catch(err){
    res.status(401).json({ message: 'Invalid token' });
  }
};
