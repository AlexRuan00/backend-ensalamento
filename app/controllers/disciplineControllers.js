const database = require('../../config/database');

exports.registerDisciplines = (req, res) => {
    const { nome, idFase } = req.body;
    const query = 'INSERT INTO disciplinas (nome_materia, id_fase ) VALUES($1, $2);'
    const values = [nome, idFase]
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
    const { id } = req.params;
    const { nome, idFase } = req.body;
    const query = 'UPDATE disciplinas SET nome_materia=$1, id_fase=$2 WHERE id_materia=$3;';
    const values = [nome, idFase, id];
    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: 'Discipline successfully updated.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}



