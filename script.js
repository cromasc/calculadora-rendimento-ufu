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

function cra(resultCurso, numeroMaterias) {

    let trancamento = parseInt(prompt("Digite a quantidade de matérias com trancamento parcial:"));

    if (trancamento > numeroMaterias) {
        printErro1();
    } else {
        let cargaHorariaMatriculada = 0;
        let cargaHorariaReprovacaoFalta = 0;

        for (let i = 0; i < trancamento; i++) {
            const cargaT = parseInt(prompt("Digite a carga horária dos componentes curriculares com trancamento parcial:"));
            cargaHorariaMatriculada += cargaT;
        }

        const reprovacaoFaltas = parseInt(prompt("Digite a quantidade de reprovação por faltas:")) - 1;
        const numReprovacao = reprovacaoFaltas + 1;

        if (numReprovacao > numeroMaterias || (numReprovacao + trancamento) > numeroMaterias) {
            printErro1();
        } else {
            for (let i = 0; i < numReprovacao; i++) {
                const cargaR = parseInt(prompt("Digite a carga horária dos componentes curriculares em que houve reprovação por faltas:"));
                cargaHorariaReprovacaoFalta += cargaR;
            }

            const matriculaBasica = numeroMaterias - trancamento - numReprovacao;

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

function mga(numeroMaterias) {
    let produto = 0;
    let carga = 0;

    for (let i = 0; i < numeroMaterias; i++) {
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
    const resultCurso = document.querySelector("#curso").value;
    const semestresSelecionados = parseInt(document.querySelector("#semestres").value, 10);
    const modalidade = document.querySelector("#craMga").value;
    const resultado = document.querySelector('#resultado');
    const numeroMaterias = prompt("Digite o número de matérias cursadas");

    if (modalidade == "CRA") {
        let totalCra = 0;
        for (let i = 0; i < semestresSelecionados; i++) {
            totalCra += cra(resultCurso, numeroMaterias);
        }

        const craMedio = totalCra / semestresSelecionados;

        resultado.insertAdjacentHTML('beforeend', `Média de CRA de ${semestresSelecionados} semestres: ${craMedio}`);
    } else {
        const mgaResult = mga(numeroMaterias);
        console.log(`MGA: ${mgaResult}`);
    }
}

function ufu() {
    const resultado = document.querySelector('#resultado');
    resultado.textContent = '';
}