// index.js
import 'dotenv/config.js';
import './database/db.js';
import Album from './models/Albuns.js';
import Foto from './models/Fotos.js';
import Usuario from './models/Usuarios.js';

async function main() {
  const novaFoto = await Foto.criar('Praia de Copacabana', 'https://exemplo.com/foto1.jpg');
  console.log('📷 Foto criada:', novaFoto);

  const novoAlbum = await Album.criar('Viagem RJ');
  console.log('📁 Álbum criado:', novoAlbum);

  const novoUsuario = await Usuario.criar('João');
  console.log('👤 Usuário criado:', novoUsuario);

  const albumAtualizado = await Album.adicionarFoto(novoAlbum._id, novaFoto._id);
  console.log('📎 Foto adicionada ao álbum:', albumAtualizado);

  const albuns = await Album.listar();
  console.log('📚 Todos os álbuns:', albuns);

}

main().catch(console.error);
