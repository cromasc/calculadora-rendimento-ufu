function printErro1() {
    console.log("----------------------------------------------------------");
    console.log("o número de trancamento ou de reprovação por faltas supera a quantidade de matérias do semestre!");
    setTimeout(() => {
        console.log("encerrando o programa...");
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }, 1000);
}

function printErro2() {
    console.log("----------------------------------------------------------");
    console.log("você escreveu apenas a carga horária ou a nota");
    setTimeout(() => {
        console.log("encerrando o programa...");
        setTimeout(() => {
            console.log("----------------------------------------------------------");
            process.exit(1);
        }, 1000);
    }, 1000);
}

function cra(resultCurso) {
    const matriculasDoSemestre = parseInt(prompt("Quantas matérias você se matriculou no semestre?"), 10);

    const trancamento = parseInt(prompt("Digite a quantidade de matérias com trancamento parcial:")) - 1;
    const numTrancamento = trancamento + 1;

    if (numTrancamento > matriculasDoSemestre) {
        printErro1();
    } else {
        let cargaHorariaMatriculada = 0;
        let cargaHorariaReprovacaoFalta = 0;

        for (let i = 0; i < numTrancamento; i++) {
            const cargaT = parseInt(prompt("Digite a carga horária dos componentes curriculares com trancamento parcial:"));
            cargaHorariaMatriculada += cargaT;
        }

        const reprovacaoFaltas = parseInt(prompt("Digite a quantidade de reprovação por faltas:")) - 1;
        const numReprovacao = reprovacaoFaltas + 1;

        if (numReprovacao > matriculasDoSemestre || (numReprovacao + numTrancamento) > matriculasDoSemestre) {
            printErro1();
        } else {
            for (let i = 0; i < numReprovacao; i++) {
                const cargaR = parseInt(prompt("Digite a carga horária dos componentes curriculares em que houve reprovação por faltas:"));
                cargaHorariaReprovacaoFalta += cargaR;
            }

            const matriculaBasica = matriculasDoSemestre - numTrancamento - numReprovacao;

            if (resultCurso === "até 2400 horas") {
                trancamento = trancamento <= 4 ? -1 : trancamento - 4;
            } else if (resultCurso === "entre 2400 e 3600 horas") {
                trancamento = trancamento <= 5 ? -1 : trancamento - 5;
            } else if (resultCurso === "mais de 3600 horas") {
                trancamento = trancamento <= 6 ? -1 : trancamento - 6;
                cargaHorariaReprovacaoFalta += cargaR;
            }

            let numerador1 = 0;
            let cargaHorariaCursada = 0;

            for (let i = 0; i < matriculaBasica; i++) {
                while (true) {
                    try {
                        const input = prompt("Digite a carga horária e a nota das matérias em que não houve trancamento, nem reprovação por falta (ex: 90 78):");
                        const [carga, nota] = input.split(' ');
                        cargaHorariaCursada += parseInt(carga);
                        numerador1 += parseFloat(nota) * parseInt(carga);
                        break;
                    } catch (error) {
                        printErro2();
                    }
                }
            }

            cargaHorariaMatriculada += cargaHorariaCursada;

            let resultadoCra;
            if (cargaHorariaReprovacaoFalta === 0) {
                resultadoCra = numerador1 / cargaHorariaMatriculada;
            } else {
                resultadoCra = (numerador1 / cargaHorariaMatriculada) * (cargaHorariaReprovacaoFalta / (2 * cargaHorariaMatriculada));
            }
            return resultadoCra;
        }
    }
}

function mga() {
    const materiasMatriculadas = parseInt(prompt("Digite a quantidade de matérias cursadas:"), 10);
    let produto = 0;
    let carga = 0;

    for (let i = 0; i < materiasMatriculadas; i++) {
        while (true) {
            try {
                const input = prompt("Digite a carga horária e a nota da matéria:");
                const [carga, nota] = input.split(' ');
                if (!carga.length || !nota.length) {
                    throw new Error('Invalid input');
                }
                produto += parseFloat(nota) * parseInt(carga);
                carga += parseInt(carga);
                break;
            } catch (error) {
                printErro2();
            }
        }
    }

    const mga = produto / carga;
    return mga;
}

function main() {
    const resultCurso = prompt("Informe a categoria do curso:");
    const semestresSelecionados = parseInt(prompt("Informe a quantidade de semestres:"), 10);

    if (prompt("Informe a opção (CRA ou MGA):") === "CRA") {
        let totalCra = 0;
        for (let i = 0; i < semestresSelecionados; i++) {
            totalCra += cra(resultCurso);
        }

        const craMedio = totalCra / semestresSelecionados;
        console.log(`Média de CRA de ${semestresSelecionados} semestres: ${craMedio}`);
    } else {
        const mgaResult = mga();
        console.log(`MGA: ${mgaResult}`);
    }
}

//main();