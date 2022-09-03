const express = require('express');
const router = express.Router();

// @route      GET /api/auth 
// @desc       gets the logged in user
// @access     private
router.get('/', (req, res) => {
    res.send('gets the logged in user');
});

// @route      POST /api/auth 
// @desc       authenticates the users & fetches token
// @access     public
router.post('/', (req, res) => {
    res.send('authenticates the user');
});

module.exports = router;