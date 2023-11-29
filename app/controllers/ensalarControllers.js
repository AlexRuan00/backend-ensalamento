const database = require('../../config/database');
let materias = [];
let professores = [];


let materiasFaseAtual = [];
let professoresfaseAtual = [];
const diasSemana = [
    'seg',
    'ter',
    'qua',
    'qui',
    'sex'
]

const searchMat = (req, res) => {
    const query = 'SELECT * FROM materias'
    database.query(query).then(
        (result) => {
            result.rows.forEach(e => {
                materias.push({ nome:e.nome_materia, dias:e.dias, idFase:e.id_fase, id_materia:e.id_materia })
            });
        },
        (error) => {
            console.log({ message: "an error has occurred", error });

        }
    )
};

const returnMat = (idMat) => {
    let materia;
    materias.forEach(e => {
        if(e.id_materia === idMat){
            materia = e;
        }
    });

    return materia
}

const searchProf = (req, res) => {
    const query = 'SELECT * FROM professores'
    database.query(query).then(
        (result) => {
            result.rows.forEach(e => {
                professores.push( { nome:e.nome_professor, materias:returnMat(e.id_materia), quantidade:e.quantidade_dias, dias:e.dias_disponiveis },)
            });

           console.log(professores)
        },
        (error) => {
            console.log({ message: "an error has occurred", error });

        }
    )
};


exports.ensalar = (req, res) => {
    searchMat()
    searchProf()
    res.status(200).send('returnMat(1)');
};