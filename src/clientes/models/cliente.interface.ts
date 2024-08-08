import { Conta } from "src/contas/models/conta.interface";

export interface Cliente {
    nome: string
    clienteId: number
    endereco: string
    telefone: string
    contas: Conta[] 
    gerenteId: number
}