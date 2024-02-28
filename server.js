const http = require("http");
const url = require("url");
const { parse } = require("querystring");
const { decode } = require("base-64");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/") return respondHello(req, res);
  if (pathname === "/base64") return respondBase64(req, res, query);
  if (pathname === "/user-agent") return respondUserAgent(req, res);

  res.end();
});

function respondHello(req, res) {
  res.end(JSON.stringify({ msg: "hello" }));
}

function respondBase64(req, res, query) {
  const encodedString = query.text || "";
  const decodedString = decode(encodedString);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ decoded: decodedString }));
}

function respondUserAgent(req, res) {
  const userAgent = req.headers["user-agent"] || "Unknown";

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ userAgent }));
}

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);

if (require.main !== module) module.exports = server;
