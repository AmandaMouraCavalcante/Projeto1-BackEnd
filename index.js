// index.js
import 'dotenv/config.js';
import './database/db.js';
import Album from './models/albums.js';
import Foto from './models/foto.js';

async function main() {
  const novaFoto = await Foto.criar('Praia de Copacabana', 'https://exemplo.com/foto1.jpg');
  console.log('📷 Foto criada:', novaFoto);

  const novoAlbum = await Album.criar('Viagem RJ');
  console.log('📁 Álbum criado:', novoAlbum);

  const albumAtualizado = await Album.adicionarFoto(novoAlbum._id, novaFoto._id);
  console.log('📎 Foto adicionada ao álbum:', albumAtualizado);

  const albuns = await Album.listar();
  console.log('📚 Todos os álbuns:', albuns);
}

main().catch(console.error);
