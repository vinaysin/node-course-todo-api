const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,        
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// let newTodo = new Todo({
//     text: 'Cook dinner',
//     completed: true,
//     completedAt: Date.now
// });

// newTodo.save()
// .then( (doc) => {
//     console.log('Saved doc:', doc);
// })
// .catch( (err) => {
//     console.log('Unable to save doc:', err);
// });

module.exports = {Todo};
