const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongoUser = process.env.MONGO_USER_ID,
	mongoKey = process.env.MONGO_USER_KEY,
	mongoDB = `mongodb://${mongoUser}:${mongoKey}@ds031915.mlab.com:31915/crew-guide`;

var Task = new Schema(
	{
		title: String,
		reference: String,
		category: String
	}
);

mongoose.model('tasks', Task);

mongoose.connect(mongoDB);
