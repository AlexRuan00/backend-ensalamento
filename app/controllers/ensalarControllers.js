const database = require('../../config/database');
let materias = [];
let professores = [];


let materiasFaseAtual = [];
let professoresfaseAtual = [];
const diasSemana = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta'
]

//logica
let contagemFases = {};

const contarFase = () => {
    materias.forEach(objeto => {
        if (contagemFases[objeto.idFase]) {
            contagemFases[objeto.idFase]++;
        } else {
            contagemFases[objeto.idFase] = 1;
        }
    });
}

const definirMaterias = (idFase) => {
    materias.forEach(e => {
        if (e.idFase == idFase) {
            materiasFaseAtual.push(e)
        }
    });
}

const definirProfessores = (idFase) => {
    professores.forEach(p => {
        // p.materias.forEach(m => {
        //     if (m.idFase == idFase) {
        //         professoresfaseAtual.push(p)
        //     }
        // })
        if (p.materias.idFase == idFase) {
            professoresfaseAtual.push(p)
        }
    });
}

const removeProfessor = () => {
    const professoresComQuantidade = professoresfaseAtual.filter(e => e.quantidade > 0);
    const professoresComMateria = professoresComQuantidade.filter(e => e.materias.dias > 0);
    const professoresComDias = professoresComMateria.filter(e => e.dias.length > 0);
    professoresfaseAtual = professoresComDias;
}
const definirPrioridade = () => {
    let prioridade = professoresfaseAtual[0]
    professoresfaseAtual.forEach(e => {
        if (e.dias.length < prioridade.dias.length) {
            prioridade = e;
        }
    });
    return prioridade;
}

const diminuirDia = (materia) => {
    materia.dias = materia.dias - 1;
}



//

const returnMat = (idMat) => {
    let materia;
    materias.forEach(e => {
        if (e.id_materia === idMat) {
            materia = e;
        }
    });

    return materia
}

const searchMat = () => {
    const query = 'SELECT * FROM materias';
    return database.query(query)
        .then((result) => {
            materias = result.rows.map(e => ({ nome: e.nome_materia, dias: e.dias, idFase: e.id_fase, id_materia: e.id_materia }));
        })
        .catch((error) => {
            console.error({ message: "An error has occurred", error });
        });
};

const searchProf = () => {
    const query = 'SELECT * FROM professores';
    return database.query(query)
        .then((result) => {
            professores = result.rows.map(e => ({
                nome: e.nome_professor,
                materias: returnMat(e.id_materia),
                quantidade: e.quantidade_dias,
                dias: e.dias_disponiveis
            }));
        })
        .catch((error) => {
            console.error({ message: "An error has occurred", error });
        });
};

exports.ensalar = async (req, res) => {
    await searchMat();
    await searchProf();

    //logica
    contarFase();
    let resultado = [];
    //

    for (let idFase in contagemFases) {
        let quadroHorario = [];
        let diasDeAula = 0;
        let diasSemanais = diasSemana;
        definirMaterias(idFase)
        definirProfessores(idFase)
        materiasFaseAtual.forEach(e => {
            diasDeAula += e.dias
        });
    
        while (diasDeAula > 0) {
            removeProfessor();
            let professorPrioridade = definirPrioridade();
            let novosDiasSemana = [...diasSemanais];
            let novosDiasProfessor = [...professorPrioridade.dias];
            let copiaProfessores = professoresfaseAtual;
            for (let i = 0; i < novosDiasSemana.length; i++) {
                let parar = false;
                let iDia = i;
                let dia = novosDiasSemana[i];
                novosDiasProfessor.forEach((diaProf, iDiaProf) => {
                    if (dia === diaProf) {
                        novosDiasSemana.splice(iDia, 1);
                        novosDiasProfessor.splice(iDiaProf, 1);
                        professorPrioridade.quantidade -= 1;
                        diminuirDia(professorPrioridade.materias);
    
                        let obj = {
                            dia: dia,
                            professor: professorPrioridade.nome,
                            materia: professorPrioridade.materias.nome
                        };
    
                        quadroHorario.push(obj);
                        parar = true;
    
                        copiaProfessores.forEach((p, ip) => {
                            p.dias.forEach((d, i) => {
                                if (d === dia) {
                                    professoresfaseAtual[ip].dias.splice(i, 1)
                                }
                            });
                        });
    
                    }
                });
                if (parar) {
                    break;
                }
            };
    
            diasSemanais = novosDiasSemana; // Atualizar os dias de semana
            professorPrioridade.dias = novosDiasProfessor; // Atualizar os dias do professor
            diasDeAula--
        }
    
        materiasFaseAtual = [];
        professoresfaseAtual = [];
        resultado.push({fase:idFase, resultado:quadroHorario})
    }



    res.status(200).send(resultado);
};
