const http = require("http");
const {
  getfeedbacks,
  getfeedback,
  createfeedback,
  updatefeedback,
  deletefeedback,
} = require("./controllers/feedbackController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/feedback/list" && req.method === "GET") {
    getfeedbacks(req, res);
  } else if (
    req.url.match(/\/api\/feedback\/create\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const note = req.url.split("/")[4];
    createfeedback(req, res, note);
  } else if (req.url === "/api/feedbacks" && req.method === "POST") {
    createfeedback(req, res);
  } else if (
    req.url.match(/\/api\/feedbacks\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updatefeedback(req, res, id);
  } else if (
    req.url.match(/\/api\/feedbacks\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deletefeedback(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
