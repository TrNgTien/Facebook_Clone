const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.DB_ACCESS;

const connectDb = async () => {
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//useCreateIndex: true,
			//useFindAndModify: false,
			//useCreateIndex: true
		});
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDb;
