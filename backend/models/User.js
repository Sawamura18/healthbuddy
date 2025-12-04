const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: String,
  target: Number,
  progress: { type: Number, default: 0 },
  unit: String
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, index: true, required: true },
  passwordHash: String,
  role: { type: String, enum: ['patient','provider'], default: 'patient' },
  profile: {
    dob: String,
    allergies: String,
    medications: String
  },
  assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  goals: [GoalSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
