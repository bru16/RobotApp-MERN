import mongoose from 'mongoose';

const { MONGO_DB_URI_TEST, MONGO_DB_URI, NODE_ENV } = process.env;

const connectionString = (NODE_ENV === 'test') ? MONGO_DB_URI_TEST : MONGO_DB_URI;
// if enviroment is test, then use the test-database

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));