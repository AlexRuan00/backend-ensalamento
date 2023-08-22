const database = require('../models/database');

exports.registerDisciplines = (req, res) => {
    const { nome, fase, cargaHoraria } = req.body;
    const query = 'INSERT INTO disciplinas (nome_materia, fase_materia, carga_horaria) VALUES($1, $2, $3);'
    const values = [nome, fase, cargaHoraria]
    database.query(query, values).then(
        () => {
            res.status(201).send({ mensagem: 'Discipline successfully registered.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )

}