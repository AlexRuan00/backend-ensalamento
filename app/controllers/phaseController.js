const database = require('../../config/database');

exports.registerPhase = (req, res) => {
    const { nome } = req.body;
    const query = 'INSERT INTO fase (nome_fase) VALUES($1);'
    const values = [nome]
    database.query(query, values).then(
        () => {
            res.status(201).send({ mensagem: 'Phase successfully registered.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )

}

exports.listPhase = (req, res) => {
    const query = 'SELECT * FROM fase'
    database.query(query).then(
        (result) => {
            res.status(200).send(result.rows);
        },
        (error) => {
            res.status(500).send({ message: "an error has occurred", error });

        }
    )
};

exports.deletePhase = (req, res) => {
    const query = "DELETE FROM fase WHERE  id_fase=$1;"
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Phase successfully deleted." })
        },
        (erro) => {
            res.status(500).send({ erro: erro })

        });
}

exports.updatePhase = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const query = 'UPDATE fase SET nome_fase=$1 WHERE id_fase=$2;';
    const values = [nome, id];
    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: 'Phase successfully updated.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}



