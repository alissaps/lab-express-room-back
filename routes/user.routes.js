const express = require("express");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

const router = express.Router();

const UserModel = require("../models/User.model");

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Cadastro

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "A senha deve conter pelo menos 8 caracteres, letras maiúscula e minúsculas, números e caracteres especiais",
      });
    }

    // Gera o salt (string aleatória) com custo 10
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    // Criptografando a senha do usuário
    const passwordHash = bcrypt.hashSync(password, salt);

    // Inserir no banco de dados

    const result = await UserModel.create({ name, email, passwordHash });

    // Responder a requisição
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });

    console.log(`found user ${foundUser}`)

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    // Essa função retorna true or false
    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    // O token é a sessão do usuário

    const token = generateToken(foundUser);

    console.log(`token ${token}`)

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

// Perfil

// Por conta do token, não precisa do /profile/:id

router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações do usuário no banco
    const user = await UserModel.findOne({ _id: req.user._id })
    .populate({
      path: "reviews",
      model: "Review",
    })
    .populate({
      path: "rooms",
      model: "Room",
    });

    // Responder a requisição
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;