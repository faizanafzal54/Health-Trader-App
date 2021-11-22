module.exports = {
  development: {
    jwtSecret: "!Has",
    dbPath: "localhost:27017/",
    dbName: "healthTrader",
    facebookAuth: {
      appId: "868966620464100",
      appSecret: "69c230cb1d9b9413cd24a6db7ec58d2c",
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
