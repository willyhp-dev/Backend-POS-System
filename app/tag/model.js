const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Tag Harus Diisi "],
        minlength: [3, 'Panjang nama Tag minimal 3 karakter'],
      maxlength:[20,'Panjang Nama Tag maksimal 20 karakter ']
    },
  },{timestamps:true});
  const Tag = mongoose.model('Tag',TagSchema);
  module.exports = Tag;