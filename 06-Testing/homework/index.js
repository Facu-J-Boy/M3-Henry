const express = require("express");
const app = express();

const { sumArray,pluck } = require("./utils");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});
app.get("/test", (req, res) => {
  res.send({
    message: "test",
  });
});
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  if (!a || !b) return res.status(400).send("not found");
  res.status(200).send({
    result: a + b,
  });
});

app.post("/product", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  if (!a || !b) return res.status(400).send("not found");
  res.send({
    result: a * b,
  });
});
app.post("/sumArray", (req, res) => {
  // console.log(req.body)
  const { array, num } = req.body;
  if (!array || !num) return res.status(400).send("not found");
  const result = sumArray(array, num);
  res.status(200).send({ result });
});

app.post("/numString", (req, res) => {
  const { string } = req.body;
  if (
    !string ||
    string === "" ||
    typeof string === "number" ||
    !typeof string === "string"
  )
    return res.status(400).send("bad request");
  const result = string.length;
  res.status(200).send({ result });
});

app.post("/pluck", (req, res) => {
  const {array, string } = req.body;
  if (!string || !array || !Array.isArray(array) || string.length === 0) return res.status(400).send("bad request");
  const result = pluck(array,string)
  res.status(200).send({ result });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecuta
