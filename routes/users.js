const express = require('express');
const router = express.Router();

// @route     POST /api/users
// @desc      registers a new user
// @access    public
router.post('/', (req, res) => {
    res.send('registers a new user');
});

module.exports = router;