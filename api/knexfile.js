module.exports = {
  client: "mysql2", //mysql driver (mysql2 module has more features that mysql)
  connection: {
    host: "db", //TODO only eorks with docker
    port: 3306,
    user: "root",
    password: "password",
    database: "weather",
  },
}; //todo separate config for production and development environments
