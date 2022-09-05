const express = require('express');
const db = require('./config/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const app = express();
const PORT = process.env.PORT || 5000;

db();

app.use(express.json({extended: false})); //enables directly accessing req.body
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

app.get('/', (req, res) => {
    res.json({msg: "Welcome to contact keeper API...."});
});

app.listen(PORT, () => {
    console.log(`Server started @port${PORT}`);
});