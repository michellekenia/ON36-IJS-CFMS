import { TipoCliente } from "../../domain/enums/tipo-cliente.enum";
import { TConta } from "../factories/conta.fabrica";
import { Cliente } from "../interfaces/cliente.interface";

export class ClienteFisico implements Cliente {
    gerenteId?: number
    tipo = TipoCliente.pessoaFisica
    clienteId: number
    contas?: TConta[]

    constructor(public nome: string, public endereco: string, public telefone: string){
        this.nome = nome
        this.endereco = endereco
        this.telefone = telefone
        this.contas = [] 
        this.gerenteId = null
    }
}