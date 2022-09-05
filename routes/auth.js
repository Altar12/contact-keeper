const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();


// @route      GET /api/auth 
// @desc       gets the logged in user
// @access     private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('--password'); //get user object without pw attribute from DB
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'server error'});
    }
});

// @route      POST /api/auth 
// @desc       authenticates the users & fetches token
// @access     public
router.post('/', 
            [check('email', 'Please provide a valid email address').isEmail(),
             check('password', 'Please provide a valid password (min length 6)').exists()],
             async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => {
            if(err) {
                throw err;
            }
            return res.json({token});
        })
    } catch(error) {
        console.log(error.message);
        return res.status(500).json({msg: 'server error'});
    }
});

module.exports = router;