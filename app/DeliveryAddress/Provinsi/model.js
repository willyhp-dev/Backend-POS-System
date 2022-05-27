const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ProvinsiSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Provinsi Harus Diisi "],
    },
  
   
  },{timestamps:true});
  const Provinsi = mongoose.model('Provinsi',ProvinsiSchema);
module.exports = Provinsi;