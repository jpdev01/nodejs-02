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
##npm run startDev

migration:
npm install knex
npm install mysql


npx knex --knexfile knexfile.ts migrate:latest