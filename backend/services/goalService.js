const User = require('../models/User');

async function getGoalsForUser(userId){
  const user = await User.findById(userId).select('goals');
  return user ? user.goals : [];
}
async function addGoal(userId, {title, target, unit}){
  const user = await User.findById(userId);
  user.goals.push({ title, target, unit });
  await user.save();
  return user.goals;
}
async function updateGoalProgress(userId, goalId, progress){
  const user = await User.findById(userId);
  const g = user.goals.id(goalId);
  if(!g) throw new Error('Goal not found');
  g.progress = progress;
  await user.save();
  return g;
}
module.exports = { getGoalsForUser, addGoal, updateGoalProgress };
