const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
    _id: new ObjectID(),
    text: '1st Todo Text'
}, {
    _id: new ObjectID(),
    text: '2nd Todo Text'
}, {
    _id: new ObjectID(),    
    text: '3rd Todo Text'
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'user1@abc.com',
    password: 'userOnePass',
    tokens: [{
        acsess: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'},'Vinay@123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'user2@abc.com',
    password: 'userTwoPass'
}];

const populateTodos = (done) => {
    Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
};

const populateUsers = (done) => {
    User.remove({})
    .then(() => {
        const user1 = new User(users[0]).save();
        const user2 = new User(users[1]).save();
        return Promise.all([user1, user2]);
    })
    .then(() => done());
};


module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};