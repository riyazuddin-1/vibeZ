const { MongoClient} = require('mongodb');
const config = require("../config.json");

var uri = config['mongodb-uri'];
const client = new MongoClient(uri);
client.connect().then(
  () => {console.log('Connected successfully to server');
}).catch(e => {
  console.log(e);
})

module.exports = client.db('vibeZ');