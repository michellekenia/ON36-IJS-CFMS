import { Conta } from "src/conta/conta.model";

export class Cliente {
    nome: string
    clienteId: number
    endereco: string
    telefone: string
    contas: Conta[] = []
    gerenteId: number

    constructor(nome: string, clienteId: number, endereco: string, telefone: string, gerenteId: number, contas: Conta[]) {
        this.nome = nome
        this.clienteId = clienteId
        this.endereco = endereco
        this.telefone = telefone
        this.gerenteId = gerenteId
        this.contas = contas
    }


}