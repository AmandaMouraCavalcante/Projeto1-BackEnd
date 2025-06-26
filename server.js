import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
import './database/db.js';
import { logErro } from './utils/logger.js';

import Usuario from './models/usuarios.js';
import Foto from './models/foto.js';
import Album from './models/albums.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'segredoFotos123',
  resave: false,
  saveUninitialized: false
}));

app.post('/login', async (req, res) => {
  const { email } = req.body;

  const usuarios = await Usuario.listar();
  const usuario = usuarios.find(u => u.email === email);

  if (usuario) {
    req.session.usuario = usuario;
    return res.json({ mensagem: 'Login bem-sucedido', usuario });
  }

  res.status(401).json({ erro: 'Usuário não encontrado' });
});

app.get('/usuario-logado', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Usuário não logado' });
  }

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

