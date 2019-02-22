var action = require('./Action');
var apiKey = require('./ApiKey');
var device = require('./Device');
var deviceName = require('./DeviceName');

module.exports.Init = async (db) => {

    await device.init(db);

    await action.init(db);

    await apiKey.init(db);

    await deviceName.init(db);

    console.log('done');
}