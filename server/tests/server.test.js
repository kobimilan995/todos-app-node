const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [{
	_id: new ObjectID(),
	text: 'first todo test'
}, {
	_id: new ObjectID(),
	text: 'second todo test',
	completed: true,
	completedAt: 333
}];
beforeEach((done) => {
	Todo.remove({}).then(()=> {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => {
				return done(e)
			});
		})
	});

	it('should not create a new todo', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => {
				return done(e);
			});
		})

	});
});

describe('GET /todos', () => {
	it('should return all the todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		
		.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return specific todo!', (done) => {
		request(app)
		.get('/todos/'+todos[0]._id)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe('first todo test');
		})
		.end(done);
	});

	it('should return 404 if not found', (done) => {
		request(app)
		.get('/todos/'+new ObjectID())
		.expect(404)
		.end(done);
	});

	it('should return 404 if not valid id', (done) => {
		request(app)
		.get('/todos/123')
		.expect(404)
		.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('Should delete the todo with specific id', (done) => {
		request(app)
		.delete('/todos/'+todos[0]._id)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe('first todo test');
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Todo.findById(todos[0]._id).then(todo => {
				expect(null).toBe(null);
				return done();
			}).catch(error => {
				return done(error);
			});
		});
	});

	it('should return 404 if the todo is not find', (done) => {
		request(app)
		.delete(`/todos/${new ObjectID().toHexString()}`)
		.expect(404)
		.end(done);
	});


	it('should return 400 if the id is not valid', (done) => {
		request(app)
		.delete('/todos/123')
		.expect(400)
		.end(done);
	});
});

describe('PATHC /todos/:id', () => {
	it('should update a Todo', (done) => {
		var id = todos[0]._id;
		request(app)
		.patch('/todos/'+id)
		.send({
			text: 'Duvaj ga',
			completed: true
		})
		.expect(200)
		.expect(res => {
			expect(res.body.todo.text).toBe('Duvaj ga');
			expect(res.body.todo.completed).toBe(true);
		})
		.end(done);
	});


	it('should clear completed at when todo is not completed', (done) => {
		var id = todos[0]._id;
		request(app)
		.patch('/todos/'+id)
		.send({
			completed: false
		})
		.expect(200)
		.expect(res => {
			expect(res.body.todo.completed).toBe(false);
		})
		.end(done);
	});
});