const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,        
        validate: {
            validator: (value) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        },
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: false
        },
        token: {
            type: String,
            required: false
        }        
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'Vinay@123').toString();

    user.tokens.push({access, token});
    //user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then( () => token);
};

UserSchema.statics.findByToken = function(token) {
    var user = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'Vinay@123');
    } catch(e) {
        return new Promise( (resolve, reject) => {
            reject();
        });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'        
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    if ( user.isModified('password') ) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) =>{
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
