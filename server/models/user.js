const mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// let newUser = new User({
//     email: '  vinay@abc.com   ',
// });

// newUser.save()
// .then( (result) => {
//     console.log(result);
// })
// .catch ( (err) => {
//     console.log('Unable to save.', err);
// });

module.exports = {User};
