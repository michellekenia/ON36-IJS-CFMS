import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { ContaFabrica, TConta } from 'src/domain/factories/conta.fabrica';
import { TCliente } from 'src/domain/factories/cliente.fabrica';
import { CreateContaDto } from '../dto/conta/create-conta.dto';
import { validate } from 'class-validator';
import { TipoConta } from 'src/domain/enums/tipo-conta.enum';

@Injectable()
export class ContaService {


    constructor(private readonly contaFabrica: ContaFabrica) { }

    private readonly filePath = path.resolve('src/adapters/data/contas.json')

    private readonly clienteFilePath = path.resolve('src/adapters/data/clientes.json')

    private async lerContas(): Promise<TConta[]> {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8')
            return JSON.parse(data) as TConta[]
        } catch (error) {
            console.error("Erro ao ler clientes:", error)
            return []
        }

    }

    private async escreverContas(contas: TConta[]): Promise<void> {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8')
        } catch (error) {
            console.error("Erro ao escrever as contas:", error)
            throw new Error("Não foi possível salvar as contas.")
        }

    }

    private async lerClientes(): Promise<TCliente[]> {
        try {
            const data = fs.readFileSync(this.clienteFilePath, 'utf8')
            return JSON.parse(data) as TCliente[]
        } catch (error) {
            console.error("Erro ao ler os clientes:", error)
            return []

        }

    }

    private async validarContaDto(contaDto: CreateContaDto): Promise<void> {
        const erros = await validate(contaDto)
        if (erros.length > 0) {
            throw new BadRequestException(`Dados inválidos: ${JSON.stringify(erros)}`)
        }
    }

    private gerarId(conta: TConta[]): number {
        return conta.length > 0 ? Math.max(...conta.map(c => c.id)) + 1 : 1
    }

    async verificarIdCliente(clienteId: number): Promise<TCliente> {
        const clientes = await this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === Number(clienteId))
        if (!cliente) {
            throw new NotFoundException(`Cliente ${clienteId} não encontrado.`)
        }
        return cliente
    }

    async criarConta(clienteId: number, contaDto: CreateContaDto): Promise<TConta> {
        await this.validarContaDto(contaDto)

        await this.verificarIdCliente(clienteId)

        const novaConta = await this.contaFabrica.criarConta(contaDto)

        return this.adicionarListaContas(novaConta)
    }


    async adicionarListaContas(conta: TConta): Promise<TConta> {
        const contas = await this.lerContas()
        conta.id = this.gerarId(contas)
        contas.push(conta)
        await this.escreverContas(contas)
        return conta
    }

    async buscarTodos(): Promise<TConta[]> {
        return this.lerContas()
    }

    async buscarPorId(id: number): Promise<TConta> {
        const contas = await this.lerContas()
        const conta = contas.find(conta => conta.id === Number(id))
        if (!conta) {
            throw new NotFoundException(`Conta de id ${id} não encontrada.`)
        }
        return conta
    }

    async alterarConta(id: number, novoTipo: CreateContaDto['tipo'], novoSaldo: CreateContaDto['saldo']): Promise <TConta> {
        const contas = await this.lerContas()
        const conta =  contas.find((conta) => conta.id === Number(id))

        if (!conta) {
            throw new NotFoundException('Conta não encontrada.')
        }

        conta.tipo = novoTipo
        conta.saldo = novoSaldo

        await this.escreverContas (contas)
        return conta
    }


    async removerConta(id: number): Promise<void> {
        const contas = await this.lerContas();
        const contasIndex = contas.findIndex(conta => conta.id === id);
    
        if (contasIndex < 0) {
            throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
        }
    
        contas.splice(contasIndex, 1);
        await this.escreverContas(contas);
    }
}


