const express = require("express");

const application = express();

application.use((req, res, next) => {
  console.log("Request received");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

application.use("/api/posts", (req, res, next) => {
  const posts = [
    { id: "1", title: "Test Title 1", content: "Test Content 1" },
    { id: "2", title: "Test Title 2", content: "Test Content 2" },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = application;
