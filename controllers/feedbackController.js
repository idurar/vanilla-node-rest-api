const feedbackModel = require("../models/feedbackModel");

const { getPostData } = require("../utils");

// @desc    Gets All feedbacks
// @route   GET /api/feedbacks
async function getfeedbacks(req, res) {
  try {
    const feedbacks = await feedbackModel.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(feedbacks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single feedback
// @route   GET /api/feedback/:id
async function getfeedback(req, res, id) {
  try {
    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "feedback Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(feedback));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a feedback
// @route   POST /api/feedbacks
async function createfeedback(req, res, note) {
  try {
    const feedback = {
      note,
    };

    const newfeedback = await feedbackModel.create(feedback);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newfeedback));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a feedback
// @route   PUT /api/feedbacks/:id
async function updatefeedback(req, res, id) {
  try {
    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "feedback Not Found" }));
    } else {
      const body = await getPostData(req);

      const { note } = JSON.parse(body);

      const feedbackData = {
        note: note || feedbackModel.note,
      };

      const updfeedback = await feedbackModel.update(id, feedbackData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updfeedback));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
async function deletefeedback(req, res, id) {
  try {
    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "feedback Not Found" }));
    } else {
      await feedbackModel.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `feedback ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getfeedbacks,
  getfeedback,
  createfeedback,
  updatefeedback,
  deletefeedback,
};
