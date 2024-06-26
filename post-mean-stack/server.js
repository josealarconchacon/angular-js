const application = require("./backend/application");
const debug = require("debug")("node-angular");
const http = require("http");

// normalize the port into a number, string, or false.
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event.
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
application.set("port", port);

// Create HTTP server.
const server = http.createServer(application);

// Listen on provided port, on all network interfaces.
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
