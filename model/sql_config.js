const dbConfig = {
    host: 'db',
    database: 'home',
    username: 'api',
    password: 'api'
}

// Read if there is specifications in environment variable.
if(process.env.RQRSDA_MYSQL_HOST != null) dbConfig.host = process.env.RQRSDA_MYSQL_HOST;
if(process.env.RQRSDA_MYSQL_USERNAME != null) dbConfig.username = process.env.RQRSDA_MYSQL_USERNAME;
if(process.env.RQRSDA_MYSQL_PASSWORD != null) dbConfig.password = process.env.RQRSDA_MYSQL_PASSWORD;
if(process.env.RQRSDA_MYSQL_DATABASE != null) dbConfig.database = process.env.RQRSDA_MYSQL_DATABASE;

module.exports = dbConfig;