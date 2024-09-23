module.exports = {
  development: {
    jwtSecret: "!Has", // jwt secret
    dbPath: "localhost:27017/",
    dbName: "healthTrader",
    facebookAuth: {
      appId: "", // Facebook appId
      appSecret: "", // Facebook App Secret
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
