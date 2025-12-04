const express = require('express');
const auth = require('../middleware/auth');
const { getGoalsForUser, addGoal, updateGoalProgress } = require('../services/goalService');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const goals = await getGoalsForUser(req.user.id);
  res.json(goals);
});

router.post('/', auth, async (req, res) => {
  const { title, target, unit } = req.body;
  const goals = await addGoal(req.user.id, { title, target, unit });
  res.json(goals);
});

router.patch('/:goalId', auth, async (req, res) => {
  const { progress } = req.body;
  try {
    const g = await updateGoalProgress(req.user.id, req.params.goalId, progress);
    res.json(g);
  } catch(err){
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
