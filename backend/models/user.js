const mongoose = require("mongoose");
const schema = new mongoose.Schema({});

schema.methods.toDTO = function () {
  return {
    id: this._id,
  };
};

const model = mongoose.model("User", schema);
exports.default = model;
