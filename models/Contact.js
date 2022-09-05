const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'personal'
    },
    registeredDate: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;