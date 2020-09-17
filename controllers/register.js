const errors = {}
module.exports = (req, res) => {
    res.render('register', { errors })
}