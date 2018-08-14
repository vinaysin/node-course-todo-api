let express = require('express');
let bodyParser = require('body-parser');

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
        res.status(200).send(err);
    });

});


app.listen(3000, () =>{
    console.log('Server started at port: 3000');
})

module.exports = {app};