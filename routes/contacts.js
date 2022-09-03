const express = require('express');
const router = express.Router();

// @route    GET /api/contacts
// @desc     fetches all the user contacts
// @access   private
router.get('/', (req, res) => {
    res.send('fetches the user contacts');
});

// @route    POST /api/contacts
// @desc     creates a new user contact
// @access   private
router.post('/', (req, res) => {
    res.send('creates a new user contact');
});

// @route    PUT /api/contacts/:id
// @desc     updates a user contact
// @access   private
router.put('/:id', (req, res) => {
    res.send(`will update the contact with id ${req.params.id}`);
});

// @route    DELETE /api/contacts/:id
// @desc     deletes a user contact
// @access   private
router.delete('/:id', (req, res) => {
    res.send(`will delete the contact with id ${req.params.id}`);
});

module.exports = router;