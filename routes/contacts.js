const express = require('express');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const router = express.Router();

// @route    GET /api/contacts
// @desc     fetches all the user contacts
// @access   private
router.get('/', auth, async (req, res) => {
    try {
       const contacts = await Contact.find({user: req.user.id}).sort({registeredDate: -1});
        res.json({msg: 'fetch successful', contacts});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'server error'});
    }
});

// @route    POST /api/contacts
// @desc     creates a new user contact
// @access   private
router.post('/',
            [auth,
             check('name', 'Please provide a name').not().isEmpty(),
             check('email', 'Please provide a valid email').isEmail(),
             check('phone', 'Please provide a phone number').not().isEmpty()],
            async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, phone, type} = req.body;
    try {
        const contact = new Contact({user: req.user.id, name, email, phone, type});
        await contact.save();
        return res.json({msg: 'contact saved successfully', contact});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'server error'});
    }
});

// @route    PUT /api/contacts/:id
// @desc     updates a user contact
// @access   private
router.put('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) {
            return res.status(400).json({msg: 'Invalid contact id'});
        } else if(req.user.id !== user.user.toString()) {
            return res.status(401).json({msg: 'Not authorised'});
        }
        const {name, email, phone, type} = req.body;
        const contactFields = {};
        if(name) contactFields.name = name;
        if(email) contactFields.email = email;
        if(phone) contactFields.phone = phone;
        if(type) contactFields.type = type;
        const newContact = await Contact.findByIdAndRemove(req.params.id, {$set: contactFields}, {new: true});
        return res.json({msg: 'contact updated successfully', newContact});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'server error'});
    }
});

// @route    DELETE /api/contacts/:id
// @desc     deletes a user contact
// @access   private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) {
            return res.status(400).json({msg: 'invalid contact id'});
        } else if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No authorisation'});
        }
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        return res.json({msg: 'successful', deletedContact});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'server error'});
    }
});

module.exports = router;