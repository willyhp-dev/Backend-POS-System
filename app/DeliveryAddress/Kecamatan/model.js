const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const KecamatanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nama Kecama Harus Diisi "],
    },
  
   
  },{timestamps:true});
  const Kecamatan = mongoose.model('Kecamatan',KecamatanSchema);
  module.exports = Kecamatan;