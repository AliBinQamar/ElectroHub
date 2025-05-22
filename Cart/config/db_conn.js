const mongoose = require('mongoose'); //to connect with DB
const redis = require('redis'); //In memory data store, used in cache and sessions store
require('dotenv').config(); //load environment variables from .env file 

const redisClient = redis.createClient(); //client create

//variables reading
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_cluster = process.env.MONGO_CLUSTER;
const mongo_database = process.env.MONGO_DBNAME;

//atlas connection
mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}/${mongo_database}?retryWrites=true&w=majority`
, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(`Connected to: ${mongoose.connection.name}`))
.catch(err => console.log(err));

module.exports = mongoose;