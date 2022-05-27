const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Kategori Harus Diisi "],
        minlength: [3, 'Panjang nama Kategori minimal 3 karakter'],
      maxlength:[20,'Panjang Nama Kategori maksimal 20 karakter ']
    },
  },{timestamps:true});
  const Category = mongoose.model('Category',CategorySchema);
  module.exports = Category;