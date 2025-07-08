import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
import './database/db.js';
import { logErro } from './utils/logger.js';
import { verificarAutenticacao } from './middleware/autenticacao.js';

import Usuario from './models/usuarios.js';
import Foto from './models/foto.js';
import Album from './models/albums.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'segredoFotos123',
  resave: false,
  saveUninitialized: true
}));

app.post('/usuarios', async (req, res) => {
  const { name, email, senha } = req.body;
  try {
    const novoUsuario = await Usuario.criar(name, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }
    req.session.usuario = {
      id: usuario._id,
      name: usuario.name,
      email: usuario.email
    };
    res.json({ mensagem: 'Login bem-sucedido', usuario: req.session.usuario });
  } catch (error) {
    logErro(error);
    res.status(500).json({ erro: 'Ocorreu um erro interno.' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ erro: 'Não foi possível fazer logout.' });
    }
    res.clearCookie('connect.sid');
    res.json({ mensagem: 'Logout realizado com sucesso.' });
  });
});

app.use(verificarAutenticacao);

app.get('/usuario-logado', (req, res) => {
  res.json({ usuario: req.session.usuario });
});

app.post('/fotos', async (req, res) => {
  const { titulo, url } = req.body;
  if (!titulo || !url) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }
  try {
    const foto = await Foto.criar(titulo, url);
    res.status(201).json(foto);
  } catch {
    res.status(500).json({ erro: 'Erro ao criar foto' });
  }
});

app.get('/fotos', async (req, res) => {
  const fotos = await Foto.listar();
  res.json(fotos);
});

app.post('/albuns', async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: 'O nome do álbum é obrigatório' });
  }
  try {
    const album = await Album.criar(nome);
    res.status(201).json(album);
  } catch {
    res.status(500).json({ erro: 'Erro ao criar álbum' });
  }
});

app.get('/albuns', async (req, res) => {
  const albuns = await Album.listar();
  res.json(albuns);
});

app.post('/albuns/:id/foto', async (req, res) => {
  const { id } = req.params;
  const { idFoto } = req.body;
  if (!idFoto) {
    return res.status(400).json({ erro: 'ID da foto é obrigatório' });
  }
  try {
    const atualizado = await Album.adicionarFoto(id, idFoto);
    res.json(atualizado);
  } catch {
    res.status(500).json({ erro: 'Erro ao adicionar foto ao álbum' });
  }
});

app.use((err, req, res, next) => {
  logErro(err);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});