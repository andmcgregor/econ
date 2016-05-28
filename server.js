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

app.get("/econ/api/countries", function(req, res) {
  client.query("SELECT * FROM countries ORDER BY name", function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

app.get("/econ/api/countries/:code/imports/:year", function(req, res) {
  client.query("SELECT product, count(*), sum(import_val) AS summed FROM trades WHERE destination=$1 AND year=$2 GROUP BY product ORDER BY summed DESC", [req.params.code, req.params.year], function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

app.get("/econ/api/countries/:code/exports/:year", function(req, res) {
  client.query("SELECT product, count(*), sum(export_val) AS summed FROM trades WHERE origin=$1 AND year=$2 GROUP BY product ORDER BY summed DESC", [req.params.code, req.params.year], function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

app.get("/econ/api/countries/:code", function(req, res) {
   client.query("SELECT * FROM trades WHERE origin = $1 OR destination = $1", [req.params.code], function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

app.get("/econ/api/products", function(req, res) {
  client.query("SELECT * FROM products WHERE short_code < 9999", function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

app.get("/econ/api/trades", function(req, res) {
  var cc = req.query.country_code, pc = req.query.product_code;

  client.query("SELECT * from trades WHERE (origin = $1 OR destination = $1) AND product = $2", [cc, pc], function(err, result) {
    if (err) return console.error("error:", err);
    res.json(result.rows);
  });
});

