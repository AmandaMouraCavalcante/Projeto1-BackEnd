import { logErro } from '../utils/logger.js'; 
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }],
});

const AlbumModel = mongoose.model('Album', albumSchema);

export default class Album {
  static async criar(nome) {
    try {
      const album = new AlbumModel({ nome, fotos: [] });
      return await album.save();
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao criar álbum');
    }
  }

  static async buscarPorNome(nome) {
    try {
      return await AlbumModel.find({ nome: new RegExp(nome, 'i') }).populate('fotos');
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao buscar álbum por nome');
    }
  }

  static async listar() {
    try {
      return await AlbumModel.find().populate('fotos');
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao listar álbuns');
    }
  }

  static async adicionarFoto(idAlbum, idFoto) {
    try {
      return await AlbumModel.findByIdAndUpdate(
        idAlbum,
        { $push: { fotos: idFoto } },
        { new: true }
      );
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao adicionar foto ao álbum');
    }
  }
}
