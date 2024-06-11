const router = require('express').Router();
const db = require('../db');

router.post('/add', async (req, res) => {
    await db.addBill(req.body);
    res.json({status: 'ok'});
});

router.get('/getall', async (req, res) => {
    res.json(await db.getBills());
})

router.get('/getBillWithParticipants/:id', async (req, res) => {
    const bill = await db.getBillWithParticipants(req.params.id);
    res.json(bill);
})

module.exports = router;