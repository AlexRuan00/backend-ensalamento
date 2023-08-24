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

exports.listDisciplines = (req, res) => {
    const query = 'SELECT * FROM disciplinas'
    database.query(query).then(
        (result) => {
            res.status(200).send(result.rows);
        },
        (error) => {
            res.status(500).send({ message: "an error has occurred", error });

        }
    )
};

exports.deleteDisciplines = (req, res) => {
    const query = "DELETE FROM disciplinas WHERE  id_materia=$1;"
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Discipline successfully deleted." })
        },
        (erro) => {
            res.status(500).send({ erro: erro })

        });
}

exports.updateDisciplines = (req, res) => {
    const {id} = req.params;
    const { nome, fase, cargaHoraria } = req.body;
    console.log(nome, fase, cargaHoraria, id)
    const query = 'UPDATE disciplinas SET nome_materia=$1, fase_materia=$2, carga_horaria =$3 WHERE id_materia=$4;';
    const values = [nome, fase, cargaHoraria, id];
    database.query(query, values).then(
        ()=> {
            res.status(200).send({ mensagem: 'Cerveja atualizada com sucesso!' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}