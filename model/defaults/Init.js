var action = require('./Action');
var apiKey = require('./ApiKey');
var method = require('./Method');
var device = require('./Device');
var action = require('./Action');

module.exports.Init = async (db) => {

    await action.init(db);

    await apiKey.init(db);
    
    await method.init(db);

    await device.init(db);

    // await apiKey.init(db);


    console.log('done');
}