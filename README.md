# 📸 Projeto 1 – Armazenamento de Fotos (Google Fotos Clone)

Disciplina: **Programação Web Back-End – EC48B-C71**  
Professores: Monique Emídio de Oliveira, Willian Massami Watanabe  
Alunas: Amanda Moura Cavalcante 2261049, Melina Alves Gonçalves 2312727  

---

## 📚 Descrição do Projeto

Este projeto consiste no desenvolvimento de uma biblioteca em **Node.js** que simula um sistema de **armazenamento e busca de fotos em álbuns**, inspirado no Google Fotos.

O sistema possui três entidades principais:
- `Usuário`: representa pessoas que utilizam o sistema.
- `Foto`: representa imagens com título, URL e data de envio.
- `Álbum`: agrupa fotos em categorias por nome.

O foco está em **inserção, busca, deleção, tratamento de erros e registro de logs**, conforme os critérios definidos no enunciado do Projeto 1.

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- MongoDB (Mongoose)
- ECMAScript Modules (ESM)
- Dotenv
- Log de erros com sistema de arquivos (`fs`)
        
---

## ⚙️ Funcionalidades Implementadas

### ✅ Usuário
- Criar usuário com nome e e-mail único
- Listar todos os usuários
- Deletar usuário por ID

### ✅ Foto
- Criar foto com título e URL obrigatórios
- Listar todas as fotos
- Buscar fotos por título (case-insensitive)
- Deletar foto por ID

### ✅ Álbum
- Criar álbum com nome obrigatório
- Adicionar fotos a um álbum
- Listar todos os álbuns com as fotos populadas
- Buscar álbuns por nome (case-insensitive)
- Deletar álbum por ID

---

## 🚨 Tratamento de Erros

- Todos os métodos possuem `try/catch` para capturar exceções
- Os erros são registrados em `logs/erros.log` com data e hora
- Mensagens de erro amigáveis são lançadas para o terminal

---




