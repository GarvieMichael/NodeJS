// === Database Connectivity Testing ===
const user = process.env.DB_USER;
const user_password = process.env.DB_USER_PW;
const dbName = process.env.DB_NAME;
const mongo_route = 'mongodb://' + user + ':' + user_password + '@' + dbName + '/' + dbName;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = {
    test_connectivity: function() {
        MongoClient.connect(mongo_route, function(err, client) {
        assert.strictEqual(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        client.close();
        });
    },

    create_collection: function(collection_name) {
        if (db == null) {
            this.test_connectivity;
        }
        db.createCollection(collection_name);
    },

    write_to_collection: function(collection_name, data) {
        if (db == null) {
            this.test_connectivity;
        }
        db.collection_name.insert([data])
    },
    global_db: db
}
