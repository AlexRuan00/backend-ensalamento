const database = require('../models/database');

 exports.registerProfessor = (req, res) => {
     const {nome} = req.body;
     const query = 'INSERT INTO professores(nome_professor) VALUES($1);'
     const values = [nome]
        database.query(query, values).then(
         ()=> {
             res.status(201).send({ mensagem: 'Professor successfully registered.' });
         },
         (erro) => {
             res.status(500).send({ erro: erro });
         }
     )
 };
 exports.listProfessor = (req,res)=>{
    const query = 'SELECT * FROM professores'
    database.query(query).then(
        (result)=>{
            res.status(200).send(result.rows);
        },
        (error) => {
            res.status(500).send({message: "an error has occurred", error});
        }
    )
 }