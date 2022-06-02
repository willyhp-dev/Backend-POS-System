const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Makanan Harus Diisi "],
      minlength: [3, 'Panjang nama makanan minimal 3 karakter'],
    },
    price: {
      type: Number,
      required: true,
      min: 1000,
      maxlength: 1000000,
    },
    description: {
        type: String,
        maxlength:[1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
     image_url: {
          type: String,
          default:0
  },
  public: {
    type: String,
    default: "Not Public"
     },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      
   
  },
   tag: {
    type: Schema.Types.ObjectId,
    ref:'Tag'
    }
  },{timestamps:true});
  const Product = mongoose.model('Product',ProductSchema);
  module.exports = Product;