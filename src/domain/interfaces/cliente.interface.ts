
import { TipoCliente } from '../../domain/enums/tipo-cliente.enum';
import { TConta } from '../factories/conta.fabrica';

export interface Cliente {
    nome: string
    clienteId: number
    endereco: string
    telefone: string
    contas?: TConta[] 
    gerenteId?: number 
    tipo: TipoCliente
}