const User = require('../model/UserModel')
var errors = {};
module.exports = (req, res) => {
    if (req.body && req.body.password === req.body.rePassword) {
        User.create(req.body, (err, user) => {
            if (err) {
                errors.userIsFounded = "User id founded"
                return res.render('register', { errors })
            }
            res.redirect('/');
        })
    } else {
        errors.passwordNotEqual = " Password not equal"
        res.render('register', { errors })
    }
}