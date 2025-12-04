const express = require('express');
const auth = require('../middleware/auth');
const { assignPatientToProvider } = require('../services/assignService');
const router = express.Router();

// POST /api/assign/provider/:providerId
router.post('/provider/:providerId', auth, async (req, res) => {
  // only provider or admin (MVP: allow provider to self-assign patients or you could restrict)
  const { providerId } = req.params;
  const { patientId } = req.body;
  if(!patientId) return res.status(400).json({ message: 'patientId required' });
  try {
    const provider = await assignPatientToProvider(providerId, patientId);
    res.json({ assignedPatients: provider.assignedPatients });
  } catch(err){
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
