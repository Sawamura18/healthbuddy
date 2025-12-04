const User = require('../models/User');

async function findByEmail(email){
  return User.findOne({ email });
}
async function findById(id){
  return User.findById(id);
}
async function updateProfile(userId, updates){
  return User.findByIdAndUpdate(userId, { name: updates.name, profile: updates.profile }, { new: true }).select('-passwordHash');
}
module.exports = { findByEmail, findById, updateProfile };
