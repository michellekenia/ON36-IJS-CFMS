import { Cliente } from 'src/clientes/models/cliente.interface';
import { TipoFuncionario } from './../enums/tipo-funcionario.enum';
import { Funcionario } from "./funcionario.interface";

export class Gerente implements Funcionario {
    tipo = TipoFuncionario.gerente
    clientes?: Cliente[]
    id: number
    
    constructor (public nome: string) {

    }
}