module.exports =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "", // your facebook app id
      }
    : {
        apiUrl: "http://localhost:5000/api/",
        facebookAppId: "",
      };
