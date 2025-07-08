export function verificarAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();

  } else {
    return res.status(401).json({ erro: 'Acesso negado. Por favor, faça o login.' });
    
  }
}