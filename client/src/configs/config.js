module.exports =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "850230712313757",
      }
    : {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "850230712313757",
      };
