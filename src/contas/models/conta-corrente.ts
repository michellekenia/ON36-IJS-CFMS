import { TipoConta } from "../enums/tipo-conta.enum";
import { Conta } from "./conta.interface";

export class ContaCorrente implements Conta {
    tipo = TipoConta.corrente
   id: number

    constructor(public saldo: number, public clienteId: number) {
    }
}
