const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// respond with 304 if cached
app.get("/cached", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=60"); // cache for 60 seconds
  res.sendFile(path.join(__dirname, "public", "cache-cat.png"));
});

// respond with 200 when not cached
app.get("/not-cached", (req, res) => {
  res.setHeader("Cache-Control", "no-store"); // not cache anything
  res.sendFile(path.join(__dirname, "public", "cache-cat.png"));
});

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});
