import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { ContaFabrica, TConta } from 'src/domain/factories/conta.fabrica';
import { TCliente } from 'src/domain/factories/cliente.fabrica';
import { TipoConta } from 'src/domain/enums/tipo-conta.enum';

@Injectable()
export class ContaService {

    contaFabrica: ContaFabrica
    constructor(contaFabrica: ContaFabrica) {
        this.contaFabrica = contaFabrica
    }

    private readonly filePath = path.resolve('src/adapters/data/contas.json')
    private readonly clienteFilePath = path.resolve('src/adapters/data/clientes.json')

    private lerContas(): TConta[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as TConta[]
    }

    private escreverContas(contas: TConta[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8')
    }

    private lerClientes(): TCliente[] {
        const data = fs.readFileSync(this.clienteFilePath, 'utf8');
        return JSON.parse(data) as TCliente[];
    }

    criarConta(tipo: TipoConta, saldo: number, clienteId: number): TConta {
        this.verificarIdCliente(clienteId)
        const novaConta = this.contaFabrica.criarConta(tipo, saldo, clienteId)
        return this.adicionarListaContas(novaConta)
    }

    verificarIdCliente(clienteId: number): TCliente {
        const clientes = this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === Number(clienteId))
        if (!cliente) {
            throw new NotFoundException(`Cliente ${clienteId} não encontrado.`)
        }
        return cliente
    }

    adicionarListaContas(conta: TConta) {
        const contas = this.lerContas()
        conta.id = contas.length > 0 ? contas[contas.length - 1].id + 1 : 1
        contas.push(conta)
        this.escreverContas(contas)
        return conta
    }

    buscarTodos(): TConta[] {
        return this.lerContas()
    }

    buscarPorId(id: number): TConta {
        const contas = this.lerContas()
        const conta = contas.find(conta => conta.id === Number(id))
        if (!conta) {
            throw new NotFoundException(`Conta de id ${id} não encontrada`)
        }
        return conta
    }

    alterarTipoConta(id: number, novoTipo: TipoConta): TConta {
        const contas = this.lerContas()
        const conta = contas.find((conta) => conta.id === Number(id))

        if (!conta) {
            throw new NotFoundException('Conta não encontrada.')
        }

        conta.tipo = novoTipo
        this.escreverContas(contas)
        return conta

    }

    alterarSaldo(id: number, novoSaldo: number): TConta {
        const contas = this.lerContas()
        const conta = contas.find(conta => conta.id === Number(id))

        conta.saldo = novoSaldo
        this.escreverContas(contas)
        return conta

    }

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


