const errors = {
};
module.exports = (req, res) => {
    res.render('login', {
        errors
    })
}