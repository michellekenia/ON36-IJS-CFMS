import { Injectable } from "@nestjs/common";
import { ContaPoupanca } from "../models/conta-poupanca";
import { ContaCorrente } from "../models/conta-corrente";
import { TipoConta } from "../enums/tipo-conta.enum";
import { CreateContaDto } from "src/application/dto/conta/create-conta.dto";
import { validate } from "class-validator";

@Injectable()
export class ContaFabrica {
    async criarConta(contaDto: CreateContaDto): Promise <TConta> {
        const {tipo, saldo, clienteId} = contaDto

        const erros = await validate(contaDto);
        if (erros.length > 0) {
            throw new Error(`Dados inválidos: ${JSON.stringify(erros)}`);
        }

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