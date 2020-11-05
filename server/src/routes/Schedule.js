const router = require('express').Router();
const ScheduleController = require('../controllers/Schedule');
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const items = await ScheduleController.getAll();
        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: items
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(500).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

router.post('/generate', bearerAuth, async (req, res) => {
    try {
        const items = await ScheduleController.generateSchedule();
        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: items
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(500).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

module.exports = router;