const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = encodeURIComponent(process.env.DB_PASS);

const connect = () => {
  // Conectar ao MongoDB
  mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.3q1if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
      console.log("Conectado ao MongoDB com sucesso!");
    })
    .catch((err) => {
      console.error("Erro ao conectar no MongoDB: ", err);
    });
};
connect();

module.exports = mongoose;
