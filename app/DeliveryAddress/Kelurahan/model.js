const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const KelurahanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Kelurahan Harus Diisi "],
    }, 
  
   
  },{timestamps:true});
  const Kelurahan = mongoose.model('Kelurahan',KelurahanSchema);
  module.exports = Kelurahan;