import { TConta } from 'src/contas/fabricas/conta.fabrica';
import { TipoCliente } from './../enums/tipo-cliente.enum';

export interface Cliente {
    nome: string
    clienteId: number
    endereco: string
    telefone: string
    contas?: TConta[] 
    gerenteId?: number 
    tipo: TipoCliente
}