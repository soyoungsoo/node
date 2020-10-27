const express = require('express');
const router = express.Router();

router.get('/json', (req, res, next) => {
    res.json({aa: 124, bb: "aaaa"});
});


module.exports = router;
