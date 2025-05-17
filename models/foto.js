import { logErro } from '../utils/logger.js'; 
import mongoose from 'mongoose';

const fotoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true },
  dataEnvio: { type: Date, default: Date.now },
});

const FotoModel = mongoose.model('Foto', fotoSchema);

export default class Foto {
  static async criar(titulo, url) {
    try {
      const foto = new FotoModel({ titulo, url });
      return await foto.save();
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao criar foto');
    }
  }

  static async buscarPorTitulo(titulo) {
    try {
      return await FotoModel.find({ titulo: new RegExp(titulo, 'i') });
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao buscar foto por título');
    }
  }

  static async listar() {
    try {
      return await FotoModel.find();
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao listar fotos');
    }
  }
}
