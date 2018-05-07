var Redis = require("ioredis");
var fs = require('fs');

var redis = new Redis({
    port: 19136,          // Redis portredis-19136.c8.us-east-1-3.ec2.cloud.redislabs.com:19136
    host: 'redis-19136.c8.us-east-1-3.ec2.cloud.redislabs.com',   
    family: 4,
    password: 'test123',
    db: 0
});

'use strict'
const redis2 = require('redis')
const client = redis2.createClient(19136, 'redis-19136.c8.us-east-1-3.ec2.cloud.redislabs.com')
client.auth('test123', function(reply) {

})

client.eval(fs.readFileSync('./Chwastek.lua'), 0, function(err, res) {
  console.log("Srednia liczba wyswietlen kążdego miesiąca na przestrzeni trzech lat uporządkowana malejąco : " + arguments[1]);
});


module.exports = redis;
