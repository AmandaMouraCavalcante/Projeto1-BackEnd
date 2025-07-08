import { logErro } from '../utils/logger.js';
import mongoose from 'mongoose';
import '../database/db.js';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true } 
});

//criptografa a senha antes de salvar

const saltRounds = 10;

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();

  try {
    const hash = await bcrypt.hash(this.senha, saltRounds);
    this.senha = hash;
    next();
  } catch (error) {
    next(error);
  }
});

usuarioSchema.methods.compararSenha = function(senhaCandidata) {
  return bcrypt.compare(senhaCandidata, this.senha);
};

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

export default class Usuario {
  static async criar(name, email, senha) {
    try {
      const usuario = new UsuarioModel({ name, email, senha });
      return await usuario.save();
    } catch (error) {
      console.error('❌ Erro detalhado ao criar usuário:', error.message);
      logErro(error);
      throw new Error('Erro ao criar usuário');
    }
  }

    static async buscarPorEmail(email) {
    try {
      return await UsuarioModel.findOne({ email });
    } catch(error) {
      logErro(error);
      throw new Error('Erro ao buscar usuário por email');
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

  static async atualizar(id, dados) {
    try {
      return await UsuarioModel.findByIdAndUpdate(id, dados, { new: true });
    } catch (error) {
      logErro(error);
      throw new Error('Erro ao atualizar usuário');
    }
  }
}
