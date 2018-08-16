let express = require('express');
let bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var port = process.env.port || 3000;
var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
      
    var todo = new Todo({
        text: req.body.text,
        completed: true,
        completedAt: Date.now()
    });

    todo.save()
    .then( (doc) => {
        res.send(doc);
    })
    .catch( (err) => {
        res.status(400).send(err);
    });

});

app.get('/todos', (req, res) => {
    Todo.find()
    .then( (todos) =>  {
        res.send({todos: todos});
    })
    .catch( (err) =>{
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid) {
        return res.send(404).send();
    }

    Todo.findById(id)
    .then( (todos) =>  {
        res.send({todos});
    })
    .catch( (err) =>{
        res.status(404).send({error: 'Invalid Id.'});
    })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save()
    .then( (user) => user.generateAuthToken())
    .then( (token) => {
        res.header('x-auth', token).send(user);
    })
    .catch( (err)=> {
        res.status(400).send(err);
    })
});

app.listen(port, () =>{
    console.log(`Server started at port:${port}`);
})

module.exports = {app};