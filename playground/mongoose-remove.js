const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');

Todo.remove({}).then(response => {
	console.log(response);
});

Todo.findOneAndRemove();

Todo.findByIdAndRemove();

Todo.findByIdAndRemove('5a0b6140f32212af8ffc07e3').then((todo) => {
	console.log(todo);
});