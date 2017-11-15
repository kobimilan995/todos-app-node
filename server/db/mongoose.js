var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV === 'production'){
	mongoose.connect('mongodb://kobimilan995:yrosevic111@ds259865.mlab.com:59865/kobicarevabaza', { useMongoClient: true });
} else {
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
}
// if(process.env.PORT){
// 	mongoose.connect('mongodb://kobimilan995:yrosevic111@ds259865.mlab.com:59865/kobicarevabaza', { useMongoClient: true });
// } else {
	
// 	console.log('duvaj ga', process.env.MONGODB_URI);
// }


module.exports = {
	mongoose
}