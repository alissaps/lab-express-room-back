// Importar o mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definifir quais campos e quais regras desses campos os documentos no MongoDB terão (Schema)
const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    reviews: [], // we will update this field a bit later when we create review model
  });

// Exportar o modelo da coleção
module.exports = mongoose.model("Room", roomSchema);
