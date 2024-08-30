import { TipoCliente } from "../../domain/enums/tipo-cliente.enum";
import { TConta } from "../factories/conta.fabrica";
import { Cliente } from "../interfaces/cliente.interface";


export class ClienteJuridico implements Cliente {
    tipo = TipoCliente.pessoaJuridica
    clienteId: number
    contas?: TConta[]

    constructor(public nome: string, public endereco: string, public telefone: string) {
        this.nome = nome
        this.endereco = endereco
        this.telefone = telefone
        this.contas = []
    }
}