import { Injectable } from "@nestjs/common";
import { ContaPoupanca } from "../models/conta-poupanca";
import { ContaCorrente } from "../models/conta-corrente";
import { TipoConta } from "../enums/tipo-conta.enum";

@Injectable()
export class ContaFabrica {

    criarConta(tipo: TipoConta, saldo: number, clienteId: number): TConta {

        switch (tipo) {
            case TipoConta.corrente:
                const contaCorrente = new ContaCorrente(saldo, clienteId)
                return contaCorrente
            case TipoConta.poupanca:
                const contaPoupanca = new ContaPoupanca(saldo, clienteId)
                return contaPoupanca

            default:
                throw new Error('Tipo de conta inválida.')
        }
    }
}

export type TConta = ContaCorrente | ContaPoupanca