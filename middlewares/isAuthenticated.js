const jwt = require("jsonwebtoken");

// Manda o token pelo cabeçalho

function extractTokenFromHeaders(req) {
  if (!req.headers.authorization) {
    throw new Error("Requisição inválida: não contém cabeçalho Authorization");
  }

  return req.headers.authorization.split(" ")[1];
}

function isAuthenticated(req, res, next) {
  const token = extractTokenFromHeaders(req);
  console.log(token)

  jwt.verify(token, process.env.TOKEN_SIGN_SECRET, (err, decoded) => {
// Se o processo de verificação falha, encerra a função
    if (err) {
      console.log(err);

      return res
        .status(401)
        .json({ msg: "Acesso negado.", reason: err.message });
    }

    req.user = decoded;
    return next(); // chama a próxima função da corrente
  });
}

module.exports = isAuthenticated;