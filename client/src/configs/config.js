module.exports =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "http://18.116.180.161:5000/api/",
        facebookAppId: "868966620464100",
      }
    : {
      apiUrl: "http://18.116.180.161:5000/api/",
        facebookAppId: "868966620464100",
      };
