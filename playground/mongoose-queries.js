const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');

var id = '5a09ff9bfde5a71818d6c3d3'; 

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// }).catch((error) => {

// });


// Todo.findOne({
// 	_id: id
// }).then(todo => {
// 	console.log('Todo ', todo);
// });


// Todo.findById(id).then(todo => {
// 	if(ObjectID.isValid(id)) {
// 		console.log('Todo ', todo);	
// 	} else {
// 		throw new Error('ID NOT VALID');
// 	}
	
// }).catch(e => {
// 	console.log(e);
// });

User.findById(id).then(user => {
	if(!user){
		return console.log('User not found');
	}

	console.log(user);
}).catch(err => {
	console.log(err);
});