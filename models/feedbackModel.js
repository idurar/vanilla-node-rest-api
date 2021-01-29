let feedbacks = require("../data/feedbacks");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(feedbacks);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const feedback = feedbacks.find((p) => p.id === id);
    resolve(feedback);
  });
}

function create(feedback) {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const created = date.toString();
    const newfeedback = { id: Date.now(), created, ...feedback };
    feedbacks.push(newfeedback);
    writeDataToFile("./data/feedbacks.json", feedbacks);
    resolve(newfeedback);
  });
}

function update(id, feedback) {
  return new Promise((resolve, reject) => {
    const index = feedbacks.findIndex((p) => p.id === id);
    feedbacks[index] = { id, ...feedback };
    writeDataToFile("./data/feedbacks.json", feedbacks);
    resolve(feedbacks[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    feedbacks = feedbacks.filter((p) => p.id !== id);
    writeDataToFile("./data/feedbacks.json", feedbacks);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
