const router = require('express').Router();
const DriverController = require('../controllers/Driver');
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const items = await DriverController.getAll();
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

router.get('/number/:number', bearerAuth, async (req, res) => {
    try {
        const number = req.params.number;
        const item = await DriverController.getOne({number});

        if (!item) {
            return res.status(404).json({
                status: false,
                msg: 'Driver Not Found',
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: item
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

router.get('/id/:id', bearerAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const item = await DriverController.getOne({id});

        if (!item) {
            return res.status(404).json({
                status: false,
                msg: 'Drive Not Found',
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: item
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

router.post('/add', bearerAuth, async (req, res) => {
    try {
        const savedItem = await DriverController.saveItem(req.body);

        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: savedItem
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

router.put('/edit', bearerAuth, async (req, res) => {
    let statusHttpRequest = 500;
    try {
        const id = (typeof req.body.id != 'undefined') ? parseInt(req.body.id) : 0;
        if (!id) {
            statusHttpRequest = 404;
            throw 'Missing ID';
        }

        const savedItem = await DriverController.saveItem(req.body, id);

        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: savedItem
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(statusHttpRequest).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

router.delete('/del', bearerAuth, async (req, res) => {
    let statusHttpRequest = 500;
    try {
        const id = (typeof req.body.id != 'undefined') ? parseInt(req.body.id) : 0;
        if (!id) {
            statusHttpRequest = 404;
            throw 'Missing  ID';
        }

        const item = await DriverController.delItem(id);

        return res.status(200).json({
            status: true,
            msg: 'Success',
            data: item
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(statusHttpRequest).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

module.exports = router;