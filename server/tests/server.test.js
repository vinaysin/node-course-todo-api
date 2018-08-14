const expect = require('expect');
const request = require('supertest');

const {app} = require('./../sever');
const {Todo} = require('./../models/todo');

const todos = [{
    text: '1st Todo Text'
}, {
    text: '2nd Todo Text'
}, {
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