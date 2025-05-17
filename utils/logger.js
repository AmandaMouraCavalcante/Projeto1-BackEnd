import fs from 'fs';
import path from 'path';

const logsDir = path.resolve('logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir); 
}

const logPath = path.join(logsDir, 'erros.log');

export function logErro(error) {
  const log = `[${new Date().toISOString()}] ${error.stack || error.message || error}\n`;
  fs.appendFileSync(logPath, log);
}
