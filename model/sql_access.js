const dbConfig = require('./sql_config');
const Sequelize = require('sequelize');

var sequelize;

sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: 'mysql',
	operatorsAliases: false,

	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.apiKeys = require('./ApiKey')(sequelize, Sequelize);
db.actions = require('./Action')(sequelize, Sequelize);
db.devices = require('./Device')(sequelize, Sequelize);
db.devicesNames = require('./DeviceName')(sequelize, Sequelize);
db.methods = require('./Method')(sequelize, Sequelize);

db.devicesActions = sequelize.define('devices_actions', {
	command: {
		type: Sequelize.STRING(200),
		allowNull: true
	}
});

// associations
db.devices.hasMany(db.devicesNames);
db.devicesNames.belongsTo(db.devices);
db.devices.belongsToMany(db.actions, {through: db.devicesActions})
db.actions.belongsToMany(db.devices, {through: db.devicesActions})
db.devicesActions.belongsTo(db.methods);

module.exports = db;