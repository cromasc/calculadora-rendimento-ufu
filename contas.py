from rich_menu import Menu
from sys import exit
import time

def menu():
    menu = Menu(
        "CRA",
        "MGA",
        color="bold purple",
        rule_title="calculadora de rendimento",
        align="center",
        panel_title="escolha a modalidade",
        selection_char="->",
    )
    selected = menu.ask(screen=False)
    return selected

def semestres():
    semestres = Menu(
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        color="bold purple",
        rule_title="semestre",
        align="center",
        panel_title="selecione quantos semestres entrarão no cálculo",
        selection_char="->",
    )
    selected = semestres.ask(screen=False)
    return selected

def curso():
    curso = Menu(
        "até 2400 horas",
        "entre 2400 e 3600 horas",
        "mais de 3600 horas",
        color="bold purple",
        rule_title="carga horária total do curso",
        panel_title="selecione em qual categoria você se encaixa",
        selection_char="->",
    )

    selected = curso.ask(screen=False)
    return selected

def print_erro1():
    print("----------------------------------------------------------")
    print("o número de trancamento ou de reprovação por faltas supera a quantidade de matérias do semestre!")
    time.sleep(1)
    print("encerrando o programa...")
    time.sleep(1)
    exit(1)

def print_erro2():
    print("----------------------------------------------------------")
    print("você escreveu apenas a carga horária ou a nota")
    time.sleep(1)
    print("encerrando o programa...")
    time.sleep(1)
    print("----------------------------------------------------------")
    
def cra(result_curso):
    matriculas_do_semestre = int(input("Quantas matérias você se matriculou no semestre? "))

    trancamento = int(input("Digite a quantidade de matérias com trancamento parcial: ")) - 1
    num_trancamento = trancamento + 1 
    
    if num_trancamento > matriculas_do_semestre:
        print_erro1()
    
    else:
        carga_horaria_matriculada = 0  
        carga_horaria_reprovacao_falta = 0
        
        for _ in range(num_trancamento):  
            carga_t = int(input("Digite a carga horária dos componentes curriculares com trancamento parcial: "))
            carga_horaria_matriculada += carga_t

        reprovacao_faltas = int(input("Digite a quantidade de reprovação por faltas: ")) - 1
        num_reprovacao = reprovacao_faltas + 1
        
        if num_reprovacao > matriculas_do_semestre or (num_reprovacao + num_trancamento) > matriculas_do_semestre:
            print_erro1()
        else:       
            for _ in range(num_reprovacao):
                carga_r = int(input("Digite a carga horária dos componentes curriculares em que houve reprovação por faltas: "))
                carga_horaria_reprovacao_falta += carga_r
            
            matricula_basica = matriculas_do_semestre - (num_trancamento) - (num_reprovacao)
            
        if result_curso == "até 2400 horas":
            if trancamento <=4:
                trancamento = -1
            else:
                trancamento = trancamento - 4
        if result_curso == "entre 2400 e 3600 horas":
            if trancamento <=5:
                trancamento = -1
            else:
                trancamento = trancamento - 5
        if result_curso == "mais de 3600 horas":
            if trancamento <= 6:
                trancamento = -1
            else:
                trancamento = trancamento - 6
                carga_horaria_reprovacao_falta += carga_r
            
            numerador1 = 0
            carga_horaria_cursada = 0
            
            for _ in range(matricula_basica):
                while True:
                    try:
                        carga, nota = input("Digite a carga horária e a nota das matérias em que não houve trancamento, nem reprovação por falta (ex: 90 78): ").split()
                        break  
                    except ValueError:
                        print_erro2()

                carga_horaria_cursada += int(carga)
                numerador1 += float(nota) * int(carga)
    
            carga_horaria_matriculada += carga_horaria_cursada
    
            if carga_horaria_reprovacao_falta == 0:
                resultado_cra = numerador1 / carga_horaria_matriculada
            else:
                resultado_cra = (numerador1 / carga_horaria_matriculada) * (carga_horaria_reprovacao_falta / (2 * carga_horaria_matriculada))
            return resultado_cra

def mga():
    materias_matriculadas = int(input("Digite a quantidade de matérias cursadas: "))
    produto = 0
    carga_ = 0
    for _ in range(materias_matriculadas):
        while True:
            try:
                carga, nota = input("Digite a carga horária e a nota da matéria: ").split()
                if len(carga) == 0 or len(nota) == 0:
                    raise ValueError
                produto += float(nota) * int(carga)
                carga_ += int(carga)
                break  
            except ValueError:
                print_erro2()

    mga = produto / carga_
    return mga

def main():
    result_curso = curso()
    semestres_selecionados = semestres()  
    if menu() == "CRA":
        total_cra = 0 
        for _ in range(int(semestres_selecionados)):
            total_cra += cra(result_curso)

        cra_medio = total_cra / int(semestres_selecionados)
        print(f"Média de CRA de {semestres_selecionados} semestres: {cra_medio}")
    else:
        mga_result = mga()
        print(f"MGA: {mga_result}")

if __name__ == "__main__":
    main()