import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { TipoConta } from './enums/tipo-conta.enum';
import { ContaFabrica, TConta } from './fabricas/conta.fabrica';
import { TCliente } from 'src/clientes/fabricas/cliente.fabrica';

@Injectable()
export class ContaService {
    contaFabrica: ContaFabrica
    constructor (contaFabrica: ContaFabrica){
        this.contaFabrica = contaFabrica
    }
    


    private readonly filePath = path.resolve('src/contas/data/contas.json')
    private readonly clienteFilePath = path.resolve('src/clientes/data/clientes.json')

    private lerContas(): TConta[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as TConta[]
    }

    private escreverContas(contas: TConta[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8')
    }

    private lerClientes(): TCliente[] {
        const data = fs.readFileSync(this.clienteFilePath, 'utf8')
        return JSON.parse(data) as TCliente[]
    }
    
    criarConta(tipo: TipoConta, clienteId: number, saldo: number, id: number): TConta {
        this.verificarIdCliente(clienteId)
        const novaConta = this.contaFabrica.criarConta(tipo, clienteId, saldo, id)
        return this.adicionarListaContas(novaConta)
    }

    verificarIdCliente(clienteId: number) {
        if(clienteId <= 0){
            throw new Error('Id do cliente inválido.')
        }
        const clientes = this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === clienteId)
        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado.')
        }
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

    alterarTipoConta(id: number, tipo: TipoConta): TConta {
        const contas = this.lerContas()
        const conta = contas.find((conta) => conta.id === Number(id))

        if (!conta) {
            throw new NotFoundException('Conta não encontrada.')
        }

        conta.tipo = tipo
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


