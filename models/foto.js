import mongoose from 'mongoose';

const fotoSchema = new mongoose.Schema({
  titulo: String,
  url: String,
  dataEnvio: { type: Date, default: Date.now },
});

const FotoModel = mongoose.model('Foto', fotoSchema);

export default class Foto {
  static async criar(titulo, url) {
    const foto = new FotoModel({ titulo, url });
    return await foto.save();
  }

  static async listar() {
    return await FotoModel.find();
  }
}
