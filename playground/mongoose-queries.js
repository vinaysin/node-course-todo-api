const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const todo_id = '5b72bfdbd9cecc215c9e6cf9';
const user_id = '5b6f34a13c42fa0300db99e6';

// if(!ObjectId.isValid(todo_id)) {
//     return console.log('Invalid Id.');
// }

// Todo.find({
//     _id: todo_id
// })
// .then( (todos) => {
//     console.log('Todos:', todos);
// })
// .catch( (err) =>{
//     console.log('No record found.', err);
// });

// Todo.findOne({
//     _id: todo_id
// })
// .then( (todo) => {
//     console.log('Todo:', todo);
// })
// .catch( (err) =>{
//     console.log('No record found.', err);
// });

// Todo.findById(todo_id)
// .then( (todo) => {
//     console.log('Todo: ', todo);

// })
// .catch( (err) =>{
//     console.log('No record found.');
// });

User.find()
.then( (users) => {
    console.log('Users:', JSON.stringify(users));
})
.catch( (err) =>{
    console.log('No record found.', err);
});
