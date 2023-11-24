const database = require('../../config/database');


exports.registerProfessor = (req, res) => {
    const { nome, dias, quantidadeDias, idMateria } = req.body;
    const query = 'INSERT INTO professores (nome_professor, dias_disponiveis, quantidade_dias, id_materia) VALUES($1, $2, $3, $4);'
    const values = [nome, dias, quantidadeDias, idMateria]
    database.query(query, values).then(
        () => {
            res.status(201).send({ message: 'Professor successfully registered.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}

exports.deleteProfessor = (req, res) => {
    const query = "DELETE FROM professores WHERE id_professor=$1;"
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Professor successfully deleted." })
        },
        (erro) => {
            res.status(500).send({ erro: erro })

        });
}

exports.listProfessor = (req, res) => {
    const query = 'SELECT * FROM professores'
    database.query(query).then(
        (result) => {
            res.status(200).send(result.rows);
        },
        (error) => {
            res.status(500).send({ message: "an error has occurred", error });

        }
    )
}


exports.updateProfessor = (req, res) => {
    const { id } = req.params;
    const { nome, dias, quantidadeDias } = req.body;
    console.log(nome, dias, quantidadeDias, id)
    const query = 'UPDATE professores SET nome_professor=$1, dias_disponiveis=$2, quantidade_dias=$3 WHERE id_professor=$4;';
    const values = [nome, dias, quantidadeDias, id];
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


