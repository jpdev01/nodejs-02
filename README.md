para subir, rodar no terminal:
node app.js

npm i nodemon -g
(watch) usar no terminal:
nodemom app.js


npm install uuidv4

iniciar config typescript:
 npx tsc --init

 para compilar:
 npx tsc
 dentro do dist fica o js

 para subir: 
 node dist/server.js

 para reload automatico:
 npm install ts-node-dev -D
 
configurar no package.json: ts-node-dev --inspect --ignore-watch node_modules
##npm run start:watch

migration:
npm install knex
npm install mysql

----- CONSTRUIR O BANCO -----
foi transformado esse comando em 'npm run knex:migrate'
npx knex --knexfile knexfile.ts migrate:latest 
-----


--CONFIGURANDO O CORS ---
npm i cors
adicionar tipagem (@types)
---

---Upload de Imagem (Multer)---
npm install multer
---


--LIB CELEBRATE---
usa o JOI - validação de atributo para cada coluna da tabela (username, password)
é um middleware
npm i celebrate (add tipagem)
---