var express = require("express"),
    https = require("https"),
    pg = require("pg"),
    app = express(),
    client = new pg.Client(process.env.ECON_DB);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

client.connect(function(err) {
  if (err) return console.error("could not connect to postgres", err);
});

app.listen(process.env.ECON_PORT);

app.get("/api/countries/", function(req, res) {
  client.query("SELECT * FROM countries ORDER BY name", function(err, result) {
    if (err)
      return console.error("error:", err);

    res.json(result.rows);
  });
});

