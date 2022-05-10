module.exports = {
  client: "mysql2", //mysql driver (mysql2 module has more features that mysql)
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "weather",
  },
} //todo separate config for production and development environments
