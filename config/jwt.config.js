const jwt = require("jsonwebtoken");

function generateToken(userObj) {
  const { _id, name, email } = userObj;

  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "10h";

  // o sign recebe 3 argumentos: conteúdo, senha de assinatura, objeto de 
  return jwt.sign({ _id, name, email }, signature, { expiresIn: expiration });

}

module.exports = generateToken;