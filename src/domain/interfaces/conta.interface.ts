import { TipoCliente } from "src/domain/enums/tipo-cliente.enum"
import { TipoConta } from "../enums/tipo-conta.enum"

export interface Conta {
    tipo: TipoConta
    saldo: number
    id: number,
    clienteId: number
} 