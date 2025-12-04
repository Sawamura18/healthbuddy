const User = require('../models/User');

async function assignPatientToProvider(providerId, patientId){
  const provider = await User.findById(providerId);
  if(!provider) throw new Error('Provider not found');
  // idempotent
  if(!provider.assignedPatients.some(pid => pid.toString()===patientId.toString())){
    provider.assignedPatients.push(patientId);
    await provider.save();
  }
  return provider;
}

module.exports = { assignPatientToProvider };
