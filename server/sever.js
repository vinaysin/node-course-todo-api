let express = require('express');
let bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

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
        res.status(400).send({error: 'Invalid Id.'});
    })
});

app.listen(3000, () =>{
    console.log('Server started at port: 3000');
})

module.exports = {app};