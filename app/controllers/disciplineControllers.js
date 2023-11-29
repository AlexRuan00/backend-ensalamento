const database = require('../../config/database');

exports.registerDisciplines = (req, res) => {
    const { nome, idFase, dias } = req.body;
    const query = 'INSERT INTO materias (nome_materia, id_fase, dias ) VALUES($1, $2, $3);'
    const values = [nome, idFase, dias]
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
    const query = 'SELECT * FROM materias'
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
    const query = "DELETE FROM materias WHERE  id_materia=$1;"
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
    const { nome, idFase, dias } = req.body;
    const query = 'UPDATE materias SET nome_materia=$1, id_fase=$2 dias=$3 WHERE id_materia=$4;';
    const values = [nome, idFase, dias, id];
    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: 'Discipline successfully updated.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}



