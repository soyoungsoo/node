const express = require('express');
const router = express.Router();


router.use('/v1', require('./v1/index'));

router.get('/json', (req, res, next) => {
    res.json({aa: 124, bb: "aaaa"});
});

router.use((req, res, next) => {
    res.status(404).json({
        message: 'API NOT FOUND',
    });
});

module.exports = router;
