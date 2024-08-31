import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ClienteFabrica, TCliente } from 'src/domain/factories/cliente.fabrica';
import { CreateClienteDto } from '../dto/cliente/create-cliente.dto';
import { validate } from 'class-validator';

@Injectable()
export class ClienteService {

    constructor(private readonly clienteFabrica: ClienteFabrica) { }

    private readonly filePath = path.resolve('src/adapters/data/clientes.json')

    private async lerClientes(): Promise<TCliente[]> {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data) as TCliente[];
        } catch (error) {
            console.error("Erro ao ler os clientes:", error);
            return []

        }

    }

    private async escreverCliente(clientes: TCliente[]): Promise<void> {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
        } catch (error) {
            console.error("Erro ao escrever os clientes:", error);
            throw new Error("Não foi possível salvar os clientes.")
        }
    }

    private async validarClienteDto(clienteDto: CreateClienteDto): Promise<void> {
        const erros = await validate(clienteDto);
        if (erros.length > 0) {
            throw new BadRequestException(`Dados inválidos: ${JSON.stringify(erros)}`);
        }
    }

    private gerarId(cliente: TCliente[]): number {
        return cliente.length > 0 ? Math.max(...cliente.map(c => c.clienteId)) + 1 : 1;
    }

    async criarCliente(clienteDto: CreateClienteDto): Promise<TCliente> {

        await this.validarClienteDto(clienteDto)

        const novoCliente = await this.clienteFabrica.criarCliente(clienteDto)

        return this.adicionarListaClientes(novoCliente)
    }

    async adicionarListaClientes(cliente: TCliente): Promise<TCliente> {
        const clientes = await this.lerClientes()
        cliente.clienteId = this.gerarId(clientes)
        clientes.push(cliente)
        await this.escreverCliente(clientes)
        return cliente
    }

    async buscarTodos(): Promise<TCliente[]> {
        return this.lerClientes()
    }

    async buscarPorId(id: number): Promise<TCliente> {
        const clientes = await this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === Number(id))
        if (!cliente) {
            throw new NotFoundException(`Cliente de id ${id} não encontrado.`)
        }
        return cliente
    }

    async alterarDadosClinte(id: number, clienteDto: CreateClienteDto): Promise<TCliente> {
        const clientes = await this.lerClientes()
        const cliente = clientes.find(cliente => cliente.clienteId === Number(id))

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        await this.validarClienteDto(clienteDto)
        Object.assign(cliente, clienteDto)
        await this.escreverCliente(clientes)
        return cliente

    }

    async removerCliente(id: number): Promise<void> {
        const clientes = await this.lerClientes()
        const clientesIndex = clientes.findIndex(cliente => cliente.clienteId === Number(id))

        if (clientesIndex < 0) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        clientes.splice(clientesIndex)
        await this.escreverCliente(clientes)
    }

}