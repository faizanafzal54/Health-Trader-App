module.exports = {
  development: {
    jwtSecret: "!Has",
    dbPath: "localhost:27017/",
    dbName: "healthTrader",
    facebookAuth: {
      appId: "",
      appSecret: "",
    },
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
