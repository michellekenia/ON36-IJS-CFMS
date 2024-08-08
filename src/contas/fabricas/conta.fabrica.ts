import { Injectable } from "@nestjs/common";
import { ContaPoupanca } from "../models/conta-poupanca";
import { ContaCorrente } from "../models/conta-corrente";
import { TipoConta } from "../enums/tipo-conta.enum";

@Injectable()
export class ContaFabrica {

    criarConta(tipo: TipoConta, clienteId: number, id: number, saldo: number): ContaCorrente | ContaPoupanca {

        switch (tipo) {
            case TipoConta.corrente:
                const contaCorrente = new ContaCorrente(id, saldo, clienteId)
                contaCorrente.saldo = 0
                return contaCorrente

            case TipoConta.poupanca:
                const contaPoupanca = new ContaPoupanca(id, saldo, clienteId)
                contaPoupanca.saldo = 0
                return contaPoupanca

            default:
                throw new Error('Tipo de conta inválida.')
        }
    }
}

export type TConta = ContaCorrente | ContaPoupanca