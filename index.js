// index.js
import 'dotenv/config.js';
import './database/db.js';
import Album from './models/albums.js';
import Foto from './models/foto.js';
import Usuario from './models/usuarios.js';

async function main() {
  const novoUsuario = await Usuario.criar('João Silva', 'joao' + Date.now() + '@mail.com', '123');
  console.log('👤 Usuário criado:', novoUsuario);

  const novaFoto = await Foto.criar('Praia de Copacabana', 'https://exemplo.com/foto1.jpg');
  console.log('📷 Foto criada:', novaFoto);

  const novoAlbum = await Album.criar('Viagem RJ');
  console.log('📁 Álbum criado:', novoAlbum);

  const usuarioAtualizado = await Usuario.atualizar(novoUsuario._id, { name: 'João da Silva' });
  console.log('✏️ Usuário atualizado:', usuarioAtualizado);

  const fotoAtualizada = await Foto.atualizar(novaFoto._id, { titulo: 'Praia de Ipanema' });
  console.log('✏️ Foto atualizada:', fotoAtualizada);

  const albumAtualizadoNome = await Album.atualizar(novoAlbum._id, { nome: 'Viagem ao RJ' });
  console.log('✏️ Álbum atualizado:', albumAtualizadoNome);

  const albumComFoto = await Album.adicionarFoto(novoAlbum._id, novaFoto._id);
  console.log('📎 Foto adicionada ao álbum:', albumComFoto);

  const usuarios = await Usuario.listar();
  console.log('📃 Todos os usuários:', usuarios);

  const fotos = await Foto.listar();
  console.log('📃 Todas as fotos:', fotos);

  const albuns = await Album.listar();
  console.log('📚 Todos os álbuns:', albuns);

  const deletadoUsuario = await Usuario.deletar(novoUsuario._id);
  console.log('❌ Usuário deletado:', deletadoUsuario);

  const deletadoFoto = await Foto.deletar(novaFoto._id);
  console.log('❌ Foto deletada:', deletadoFoto);

  const deletadoAlbum = await Album.deletar(novoAlbum._id);
  console.log('❌ Álbum deletado:', deletadoAlbum);

}

main().catch(console.error);
