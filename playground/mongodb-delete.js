const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to db server.');
	}
	console.log('Connected to MongoDB server');
	
	//deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat luch'}).then((response) => {
	// 	console.log(response);
	// });
	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Something to do.'}).then(response => {
	// 	console.log(response);
	// });
	//findOneAndDelete
	db.collection('Todos').findOneAndDelete({completed: false}).then(response => {
		console.log(response);
	});
	// db.close();
});