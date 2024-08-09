import { Cliente } from "./cliente.interface";
import { TipoCliente } from "../enums/tipo-cliente.enum";
import { TConta } from "src/contas/fabricas/conta.fabrica";


export class ClienteFisico implements Cliente {
    gerenteId?: number
    tipo = TipoCliente.fisico
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