const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique: true
    }, // username trung vs name cua form
    password: {
        type: String,
        required: true
    }  // password trung vs name cua form
});

UserModelSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

// Export model
const User = mongoose.model('User', UserModelSchema);
module.exports = User;