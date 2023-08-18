const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const databaseUrl = process.env.DATABASE_URL;

const database = new pg.Client(databaseUrl);

database.connect((erro) => {
    if(erro) {
        return console.log('Não foi possível se conectar com ElephantSQL', erro);
    } else {
        return console.log('Conectado ao ElephantSQL!');
    }
})

module.exports = database;
