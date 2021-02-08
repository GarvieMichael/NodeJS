//  === Requirements ===
const express = require('express')
const application = express()
const logger = require("morgan")
const database_helper = require("./helpers/database_helper")

//  === Middleware ===
application.use(logger('combined', { stream: require("./logs/log_helper")}))
application.use("/", require("./config/routes"))

// === Database Connectivity Testing ===
const user = process.env.DB_USER;
const user_password = process.env.DB_USER_PW;
const dbName = process.env.DB_NAME;
const mongo_route = 'mongodb://' + user + ':' + user_password + '@' + dbName + '/' + dbName;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect(mongo_route, function(err, client) {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

//  === Engine Setup ===
application.listen(8080);

//  === Exports ===
module.exports = application;
