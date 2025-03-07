// routes/contatoRoutes.js

const express = require("express");
const router = express.Router();
const Mensagem = require("../models/Mensagem");

// Rota para exibir o formulário de contato
router.get("/contato", (req, res) => {
  res.render("contato", { title: "Página de Contato" });
});

// Rota para processar os dados do formulário
router.post("/enviar-contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Criar um novo documento (registro) com os dados do formulário
  const novaMensagem = new Mensagem({
    nome: nome,
    email: email,
    mensagem: mensagem,
  });

  // Salvar os dados no MongoDB
  novaMensagem
    .save()
    .then(() => {
      res.send(`<h1>Obrigado pelo contato, ${nome}!</h1>
                <p>Seu e-mail: ${email}</p>
                <p>Sua mensagem foi salva com sucesso!</p>`);
    })
    .catch((err) => {
      console.error("Erro ao salvar mensagem: ", err);
      res.status(500).send("Erro ao salvar mensagem. Tente novamente.");
    });
});

// Rota para exibir as mensagens salvas
router.get("/mensagens", (req, res) => {
  Mensagem.find()
    .then((mensagens) => {
      res.render("mensagens", { mensagens: mensagens });
    })
    .catch((err) => {
      console.error("Erro ao buscar mensagens: ", err);
      res.status(500).send("Erro ao buscar mensagens. Tente novamente.");
    });
});

module.exports = router;
