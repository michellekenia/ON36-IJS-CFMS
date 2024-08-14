import { Cliente } from "src/clientes/models/cliente.interface"
import { TipoFuncionario } from "../enums/tipo-funcionario.enum"
import { Funcionario } from "./funcionario.interface"

export class Atentente implements Funcionario {
    tipo = TipoFuncionario.atendente
    clientes?: Cliente[]
    id: number

    constructor(public nome: string) {

    }
}