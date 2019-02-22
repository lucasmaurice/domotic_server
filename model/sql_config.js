const dbConfig = {
    host: 'db',
    database: 'home',
    username: 'api',
    password: 'api'
}

// Read if there is specifications in environment variable.
if(process.env.MYSQL_HOST != null) dbConfig.host = process.env.MYSQL_HOST;
if(process.env.MYSQL_USERNAME != null) dbConfig.username = process.env.MYSQL_USERNAME;
if(process.env.MYSQL_PASSWORD != null) dbConfig.password = process.env.MYSQL_PASSWORD;
if(process.env.MYSQL_DATABASE != null) dbConfig.database = process.env.MYSQL_DATABASE;

module.exports = dbConfig;
