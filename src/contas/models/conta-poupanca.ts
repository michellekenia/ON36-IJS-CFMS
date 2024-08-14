import { TipoConta } from "../enums/tipo-conta.enum";
import { Conta } from "./conta.interface";

export class ContaPoupanca implements Conta {
    tipo = TipoConta.poupanca
    id: number

    constructor(public saldo: number, public clienteId: number) {
    }
}