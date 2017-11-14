var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if(process.env.PORT){
	mongoose.connect('mongodb://kobimilan995:yrosevic111@ds259865.mlab.com:59865/kobicarevabaza', { useMongoClient: true });
} else {
	mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });
}


module.exports = {
	mongoose
}