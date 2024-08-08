import { TipoConta } from "../enums/tipo-conta.enum";
import { Conta } from "./conta.interface";

export class ContaCorrente implements Conta {
    tipo: TipoConta.corrente;

    constructor(public clienteId: number, public saldo: number, public id: number) {}
}
