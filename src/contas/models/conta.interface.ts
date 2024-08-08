import { TipoConta } from "../enums/tipo-conta.enum"

export interface Conta {
    clienteId: number
    saldo: number
    tipo: TipoConta
    id: number
} 