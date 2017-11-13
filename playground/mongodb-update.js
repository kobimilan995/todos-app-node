const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to db server.');
	}
	console.log('Connected to MongoDB server');
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5a09efa5a949e267ebc97e67')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5a09e68591c27a21740a375c')
	}, {
		$set: {
			name: 'Milan Car'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then(response => {
		console.log(response);
	});
	
	// db.close();
});