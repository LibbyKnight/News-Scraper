var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('../config/connect');

// Create a NoteSchema with the Schema class
var NoteSchema = new Schema({
  // title: a string
  title: {
    type: String
  },
  // body: a string
  body: {
    type: String
  }
});

// Make a Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
