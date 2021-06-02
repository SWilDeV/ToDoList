const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.methods.toDTO = function () {
  return {
    id: this._id,
    name: this.name,
  };
};

const model = mongoose.model("Task", schema);

exports.default = model;