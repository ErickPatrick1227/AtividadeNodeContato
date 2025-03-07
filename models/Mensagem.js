// models/Mensagem.js

const mongoose = require("mongoose");

// Definir o esquema (estrutura) de dados
const mensagemSchema = new mongoose.Schema({
  nome: String,
  email: String,
  mensagem: String,
});

// Criar o modelo baseado no esquema
const Mensagem = mongoose.model("Mensagem", mensagemSchema);

module.exports = Mensagem;
