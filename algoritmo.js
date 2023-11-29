let materias = [
    { nome: "Desenvolvimento", dias: 3, idFase: 4 },
    { nome: "Testes", dias: 1, idFase: 4 },
    { nome: "Lógica", dias: 3, idFase: 1 },
    { nome: "Eletro", dias: 1, idFase: 1 },
    { nome: "Modelagem", dias: 1, idFase: 3 },
    { nome: "IOT", dias: 2, idFase: 3 },
]

let professores = [
    { nome: "Rodrigo", materias: materias[1], quantidade: 2, dias: ['ter', 'qua'] },
    { nome: "Paulo", materias: materias[0], quantidade: 2, dias: ['seg', 'qua', 'qui'] },
    { nome: "Ruan", materias: materias[0], quantidade: 3, dias: ['seg', 'ter', 'qua'] },
    { nome: "thayse", materias: materias[2], quantidade: 3, dias: ['seg', 'qua', 'qui'] },
    { nome: "João", materias: materias[3], quantidade: 4, dias: ['ter', 'qua', 'qui'] },
    { nome: "Priscila", materias: materias[4], quantidade: 4, dias: ['ter', 'qua', 'qui'] },
    { nome: "Fábio", materias: materias[5], quantidade: 4, dias: ['ter', 'qua', 'qui'] }
];

let materiasFaseAtual = [];
let professoresfaseAtual = [];

const diasSemana = [
    'seg',
    'ter',
    'qua',
    'qui',
    'sex'
]

let contagemFases = {};
materias.forEach(objeto => {
    if (contagemFases[objeto.idFase]) {
        contagemFases[objeto.idFase]++;
    } else {
        contagemFases[objeto.idFase] = 1;
    }
});

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
    console.log(quadroHorario)
}
