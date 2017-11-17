require('./config/config');
const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then(doc => {
		res.send(doc);
	}).catch(err => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req,res) => {
	var todos = Todo.find().then(todos => {
		res.send({todos});
	}).catch(err => {
		res.status(400).send(err);
	});
	
});


app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	var todo = Todo.findById(id).then(todo => {
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch(err => {
		res.status(404).send({err});
	});
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send();
	}

	Todo.findByIdAndRemove(id).then(todo => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch(error => {
		res.status(404).send(error);
	});
});
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(400).send();
	}
	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true
	}).then(todo => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch(err => {
		res.status(400).send();
	});
});

//POST /users
app.post('/users', (req,res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch(err => {
		res.status(400).send(err);
	});
});
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then(user => {
		if(!user) {
			return Promise.reject();
		}

		req.user = user;
		req.token = token;
		next();
	}).catch(e => {
		res.status(401).send();
	});
};
app.get('/users/me', authenticate,  (req,res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log('Started on port '+port);
});





module.exports = {app};