module.exports = {
  development: {
    jwtSecret: "!Has",
    dbPath: "localhost:27017/",
    dbName: "healthTrader",
    facebookAuth: {
      appId: "850230712313757",
      appSecret: "087e706337fdbccaba73c2c75ec914ff",
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
