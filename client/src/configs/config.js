module.exports =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "http://18.116.180.161:5000/api/",
        facebookAppId: "850230712313757",
      }
    : {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "850230712313757",
      };
