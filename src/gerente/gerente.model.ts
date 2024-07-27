import { Cliente } from "src/cliente/cliente.model"

export class Gerente {
    nome: String
    id: number
    clientes: Cliente[] = []

    constructor(nome: string, id: number){
        this.nome = nome
        this.id = id
    }
}