const tape = require("tape");
const jsonist = require("jsonist");
const base64 = require("base-64");

const PORT = (process.env.PORT =
  process.env.PORT || require("get-PORT-sync")());
const server = require("./server");

const urlBase = `http://localhost:${PORT}`;

tape("should respond hello", (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err);

    t.equal(body.msg, "hello");
    t.end();
  });
});

tape("should decode base64", (t) => {
  const textToEncode = "Hello, World!";
  const encodedString = base64.encode(textToEncode);

  jsonist.get(`${urlBase}/base64?text=${encodedString}`, (err, body) => {
    if (err) t.error(err);

    t.equal(body.decoded, textToEncode);
    t.end();
  });
});

tape("cleanup", function (t) {
  server.close();
  t.end();
});
