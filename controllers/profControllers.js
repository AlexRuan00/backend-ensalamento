const database = require('../models/database');

 exports.registerProfessor = (req, res) => {
     const {nome} = req.body;
     const query = 'INSERT INTO professores(nome_professor) VALUES($1);'
     const values = [nome]
        database.query(query, values).then(
         ()=> {
             res.status(201).send({ message: 'Professor successfully registered.' });
         },
         (erro) => {
             res.status(500).send({ erro: erro });
         }
     )
 }

 exports.updateProfessor = (req, res) => {
    const oldName = req.params.nome;
    const query = 'UPDATE professores SET nome_professor=$2 WHERE nome_professor=$1';
    const values = [oldName, req.body.nome];

    database.query(query, values).then(
        () => {
            res.status(201).send({
                message: 'Professor successfully updated!'
            });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    );
};
