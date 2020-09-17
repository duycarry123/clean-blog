const User = require('../model/UserModel')
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { username, password } = req.body;
    var errors = { 
        wrongPassword: "",
        userNotFound: ""
    }
    User.findOne({ username: username }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/')
                } else {
                    errors.userNotFound = "Wrong password"
                    res.render('login', {errors})
                }
            })
        } else {
            errors.wrongPassword = "Not registered for an account";
            res.render('login', { errors })
        }
    })
}