const express = require("express");
const app = express();
const Mensagem = require("./models/Mensagem");
require("dotenv").config();

// Importar as rotas
const contatoRoutes = require("./routes/contatoRoutes");

// Rota para a página "Sobre"
app.get("/sobre", (req, res) => {
  res.render("sobre", { title: "Sobre" }); // Renderizando sobre.ejs
});

// Rota para a página inicial
app.get("/", (req, res) => {
  res.render("index", { title: "Início" }); // Renderizando index.ejs
});

app.set("view engine", "ejs"); // Configurando o mecanismo de visualização para EJS

// Linha que permite o uso de arquivos estáticos
app.use(express.static("public")); // Serve arquivos da pasta 'public'

// Middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: true }));

// Usando as rotas
app.use("/", contatoRoutes);

// Iniciando o servidor
module.exports = app;

// Rota para exibir as mensagens salvas
app.get("/mensagens", (req, res) => {
  // Buscar todas as mensagens salvas no MongoDB
  Mensagem.find()
    .then((mensagens) => {
      // Renderizar as mensagens na página e também passar o title
      res.render("mensagens", {
        mensagens: mensagens,
        title: "Mensagens Enviadas", // Definindo o título da página
      });
    })
    .catch((err) => {
      console.error("Erro ao buscar mensagens: ", err);
      res.status(500).send("Erro ao buscar mensagens. Tente novamente.");
    });
});
require("./database/connection");
