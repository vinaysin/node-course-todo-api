const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb'); 

const {app} = require('./../sever');
const {Todo} = require('./../models/todo');

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

beforeEach( (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
        .then(() => done())
        .catch( (err) => {})
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect( (res) => {
                expect(res.body.text).toBe(text);
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text})
                .then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(3);
        })
        .end(done)
    });
});

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect( (res) => {
            expect(res.body.todos.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404, if todo not found', (done) => {
        const hexID = new ObjectID().toHexString()+1;

        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if for non object', (done) => {
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
});