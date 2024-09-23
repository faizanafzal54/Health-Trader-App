module.exports =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "",
      }
    : {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "",
      };
