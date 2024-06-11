const router = require('express').Router();

const billRoutes = require('./bill');
const participantRoutes = require('./participant');

router.use('/bills', billRoutes);
router.use('/participants', participantRoutes);

module.exports = router;

