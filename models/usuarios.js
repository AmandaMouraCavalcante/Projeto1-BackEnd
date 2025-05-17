import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true }
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

export default class Usuario {
  static async criar(name, email) {
    const usuario = new UsuarioModel({ name, email });
    return await usuario.save();
  }
    static async listar() {
        return await UsuarioModel.find();
    }

}