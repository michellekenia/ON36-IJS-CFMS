import { TConta } from "src/contas/fabricas/conta.fabrica";
import { TipoCliente } from "../enums/tipo-cliente.enum";
import { Cliente } from "./cliente.interface";

export class ClienteJuridico implements Cliente {
    gerenteId?: number
    tipo = TipoCliente.pessoaJuridica
    clienteId: number
    contas?: TConta[]

    constructor(public nome: string, public endereco: string, public telefone: string) {
        this.nome = nome
        this.endereco = endereco
        this.telefone = telefone
        this.contas = []
        this.gerenteId = null
    }
}