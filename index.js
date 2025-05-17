// index.js
import 'dotenv/config.js';
import './database/db.js';
import Album from './models/albums.js';
import Foto from './models/foto.js';
import Usuario from './models/usuarios.js';

async function main() {
  const novoUsuario = await Usuario.criar('Pedro', 'opa@mail.com');
  console.log('👤 Usuário criado:', novoUsuario);

  const novaFoto = await Foto.criar('Praia de Copacabana', 'https://exemplo.com/foto1.jpg');
  console.log('📷 Foto criada:', novaFoto);

  const novoAlbum = await Album.criar('Viagem RJ');
  console.log('📁 Álbum criado:', novoAlbum);

  const albumAtualizado = await Album.adicionarFoto(novoAlbum._id, novaFoto._id);
  console.log('📎 Foto adicionada ao álbum:', albumAtualizado);

  const albuns = await Album.listar();
  console.log('📚 Todos os álbuns:', albuns);

  const buscaFotos = await Foto.buscarPorTitulo('praia');
  console.log('🔍 Fotos encontradas:', buscaFotos);

  const buscaAlbuns = await Album.buscarPorNome('viagem');
  console.log('🔍 Álbuns encontrados:', buscaAlbuns);

}

main().catch(console.error);
