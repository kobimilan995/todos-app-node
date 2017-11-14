var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kobimilan995:yrosevic111@ds259865.mlab.com:59865/kobicarevabaza', { useMongoClient: true });

module.exports = {
	mongoose
}