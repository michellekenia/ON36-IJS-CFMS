import { TipoConta } from "../../domain/enums/tipo-conta.enum";
import { Conta } from "../interfaces/conta.interface";

export class ContaCorrente implements Conta {
    tipo = TipoConta.corrente
    id: number

    constructor(public saldo: number, public clienteId: number) {
    }
}
