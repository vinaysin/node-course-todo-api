const {SHAW25} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'password@123';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

const hashedPassword = '$2a$10$ZWPaDFKTg/CBELfJ8zUw6.b8eKvSI0WRtUOZPfmLRiLq/cHIcxm5W';
bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});

