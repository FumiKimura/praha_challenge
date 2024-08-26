const http = require("http");

const PORT = 3000;

function handleRequest(request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");
  }
}

http.createServer(handleRequest).listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

var unusedVar = "This variable is not used";
