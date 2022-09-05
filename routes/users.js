const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = express.Router();

// @route     POST /api/users
// @desc      registers a new user
// @access    public
router.post('/', 
            [check('name', 'Please provide a name').not().isEmpty(),
             check('email', 'Please provide an email').not().isEmpty(),
             check('email', 'Please provide a valid email').isEmail(),
             check('password', 'Please provide a password with minimum 6 characters').isLength({min: 6})],
             async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }
    
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({msg: "User with email already exists"});
        }
        user = new User({name, email, password});
        const salt = await bcrypt.genSalt(10); //required for hashing pw, 10 rounds of encryption?
        user.password = await bcrypt.hash(password, salt);
        await user.save();
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
        });

    } catch(err) {
        console.log(err.message);
        return res.status(500).json({msg: 'server error'});
    }
});

module.exports = router;