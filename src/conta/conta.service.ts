import { Cliente } from 'src/cliente/cliente.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { Conta, TipoConta } from './conta.model';

@Injectable()
export class ContaService {

    //Metodo para leitura dos arquivos json
    private readonly filePath = path.resolve('src/conta/conta.json')
    private readonly clienteFilePath = path.resolve('src/cliente/clientes.json')

    private lerContas(): Conta[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as Conta[]
    }

    private escreverContas(contas: Conta[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8')
    }

    private lerClientes(): Cliente[] {
        const data = fs.readFileSync(this.clienteFilePath, 'utf8')
        return JSON.parse(data) as Cliente[]
    }


    //Metodo para criar uma conta
    criarConta(clienteId: number, saldo: number, tipo: TipoConta): Conta {
        const contas = this.lerContas()
        const novaConta = {
            id: contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
            saldo,
            tipo,
            clienteId
        }


        const clientes = this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === clienteId)
        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        contas.push(novaConta)
        this.escreverContas(contas)
        return novaConta
    }

    //Metodo para bucar todas as contas
    findAll(): Conta[] {
        return this.lerContas()
    }

    //Metodo para bucar uma conta por id específico
    findById(id: number): Conta {
        const contas = this.lerContas()
        const conta = contas.find(conta => conta.id === Number(id))
        if (!conta) {
            throw new NotFoundException(`Conta de id ${id} não encontrada`)
        }
        return conta
    }

    //Metodo para alterar o tipo de conta
    alterarTipoConta(id: number, tipo: TipoConta): Conta {
        const contas = this.lerContas()
        const conta = contas.find((conta) => conta.id === Number(id))

        if (!conta) {
            throw new NotFoundException('Conta não encontrada.')
        }

        conta.tipo = tipo
        this.escreverContas(contas)
        return conta

    }

    //Metodo para alterar o saldo
    alterarSaldo(id: number, novoSaldo: number): Conta {
        const contas = this.lerContas()
        const conta = contas.find(conta => conta.id === id)

        conta.saldo = novoSaldo
        this.escreverContas(contas)
        return conta

    }

    //Metodo para remover uma conta
    removerConta(id: number): void {
        const contas = this.lerContas()
        const contasIndex = contas.findIndex(conta => conta.id === id)

        if (contasIndex < 0) {
            throw new NotFoundException('Conta não encontrada.')
        }
        contas.splice(contasIndex, 1)
        this.escreverContas(contas)
    }

}


