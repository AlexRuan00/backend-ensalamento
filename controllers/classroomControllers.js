const database = require('../models/database');

exports.registerClassroom= (req, res) => {
    const { numero, fase, capacidade } = req.body;
    console.log( numero, fase, capacidade );
    const query = 'INSERT INTO salas(numero, fase_sala, capacidade) VALUES($1, $2, $3);'
    const values = [numero, fase, capacidade ]
    database.query(query, values).then(
        () => {
            res.status(201).send({ message: 'Classroom successfully registered.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )

}

exports.deleteClassroom = (req, res) => {
    const query = "DELETE FROM salas WHERE id_sala=$1;"
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Classroom successfully deleted." })
        },
        (erro) => {
            res.status(500).send({ erro: erro })

        });
}

exports.listClassrooms = (req, res) => {
    const query = 'SELECT * FROM salas'
    database.query(query).then(
        (result) => {
            res.status(200).send(result.rows);
        },
        (error) => {
            res.status(500).send({ message: "an error has occurred", error });

        }
    )
}

exports.updateClassroom = (req, res) => {
    const {id} = req.params;
    const { numero, fase, capacidade } = req.body;
    console.log(numero, fase, capacidade, id)
    const query = 'UPDATE salas SET numero=$1, fase_sala=$2, capacidade=$3 WHERE id_sala=$4;';
    const values = [numero, fase, capacidade, id];
    database.query(query, values).then(
        ()=> {
            res.status(200).send({ mensagem: 'Classroom successfully updated.' });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    )
}