const { Router } = require('express');
const countries = require('./countries');

const router = Router();

router.use('/countries', countries);

module.exports = router;
