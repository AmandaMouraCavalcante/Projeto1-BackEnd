// models/album.js
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  nome: String,
  fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }],
});

const AlbumModel = mongoose.model('Album', albumSchema);

export default class Album {
  static async criar(nome) {
    const album = new AlbumModel({ nome, fotos: [] });
    return await album.save();
  }

  static async listar() {
    return await AlbumModel.find().populate('fotos');
  }

  static async adicionarFoto(idAlbum, idFoto) {
    return await AlbumModel.findByIdAndUpdate(
      idAlbum,
      { $push: { fotos: idFoto } },
      { new: true }
    );
  }
}
