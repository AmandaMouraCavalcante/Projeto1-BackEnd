import { logErro } from '../utils/logger.js';
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

export default class Usuario {
  static async criar(name, email) {
    try {
      const usuario = new UsuarioModel({ name, email });
      return await usuario.save();
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao criar usuário');
    }
  }

  static async listar() {
    try {
      return await UsuarioModel.find();
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao listar usuários');
    }
  }

  static async deletar(id) {
    try {
      return await UsuarioModel.findByIdAndDelete(id);
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao deletar usuário');
    }
  }
}
