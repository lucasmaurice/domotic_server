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
// db.roles = require('.//Role')(sequelize, Sequelize);
// db.sessions = require('../models/Session')(sequelize, Sequelize);
// db.address = require('../models/Address')(sequelize, Sequelize);
// db.phone = require('../models/Phone')(sequelize, Sequelize);
// db.referralOrganisation = require('../models/ReferralOrganisation')(sequelize, Sequelize);

// associations
// db.roles.hasMany(db.users);
// db.users.belongsTo(db.roles);
// db.users.hasMany(db.sessions);
// db.sessions.belongsTo(db.users);
// db.referralOrganisation.hasOne(db.phone);
// db.referralOrganisation.hasOne(db.address);

module.exports = db;