import mongoose from 'mongoose';
import 'dotenv/config.js';

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

db.once('open', () => {
  console.log('✅ Conectado ao MongoDB!');
});
