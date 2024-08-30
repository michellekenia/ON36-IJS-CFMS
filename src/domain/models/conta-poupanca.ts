import { TipoConta } from "../../domain/enums/tipo-conta.enum";
import { Conta } from "../interfaces/conta.interface";

export class ContaPoupanca implements Conta {
    tipo = TipoConta.poupanca
    id: number

    constructor(public saldo: number, public clienteId: number) {
    }
}