import { Funcionario } from "../../domain/interfaces/funcionario.interface";
import { TipoFuncionario } from "../enums/tipo-funcionario.enum";
import { Cliente } from "../interfaces/cliente.interface";

export class Gerente implements Funcionario {
    tipo = TipoFuncionario.gerente
    clientes?: Cliente[]
    id: number
    
    constructor (public nome: string) {

    }
}