const express = require('express');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({mergeParams: true});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Created new account');
        res.redirect('/racetracks');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}));

module.exports = router;