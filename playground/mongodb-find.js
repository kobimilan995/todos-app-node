const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to db server.');
	}
	console.log('Connected to MongoDB server');
	db.collection('Users').find({name: 'Neda Aleksandrov'}).toArray().then((docs) => {
		// console.log(count);
		console.log(JSON.stringify(docs, undefined, 2));
	}).catch(err => {
		console.log('Unable to fetch todos ', err);
	});
	db.close();
});