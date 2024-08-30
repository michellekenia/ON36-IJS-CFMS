import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ClienteFabrica, TCliente } from 'src/domain/factories/cliente.fabrica';
import { TipoCliente } from 'src/domain/enums/tipo-cliente.enum';

@Injectable()
export class ClienteService {

    clienteFabrica: ClienteFabrica
    constructor(clienteFabrica: ClienteFabrica) {
        this.clienteFabrica = clienteFabrica
    }

    private readonly filePath = path.resolve('src/adapters/data/clientes.json')

    private lerClientes(): TCliente[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as TCliente[];
    }


    private escreverCliente(clientes: TCliente[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
    }

    criarCliente(tipo: TipoCliente, nome: string, endereco: string, telefone: string): TCliente {
        const novoCliente = this.clienteFabrica.criarCliente(tipo, nome, endereco, telefone)
        return this.adicionarListaClientes(novoCliente)
    }

    adicionarListaClientes(cliente: TCliente): TCliente {
        const clientes = this.lerClientes()
        cliente.clienteId = clientes.length > 0 ? clientes[clientes.length - 1].clienteId + 1 : 1
        clientes.push(cliente)
        this.escreverCliente(clientes)
        return cliente
    }

    buscarTodos(): TCliente[] {
        return this.lerClientes()
    }

    buscarPorId(id: number): TCliente {
        const clientes = this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === Number(id))
        if (!cliente) {
            throw new NotFoundException(`Cliente de id ${id} não encontrado.`)
        }
        return cliente
    }

    alterarDadosClinte(id: number, novoNome: string, novoEndereco: string, novoTelefone: string): TCliente {
        const clientes = this.lerClientes()
        const cliente = clientes.find(cliente => cliente.clienteId === Number(id))

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        cliente.nome = novoNome,
            cliente.endereco = novoEndereco,
            cliente.telefone = novoTelefone

        this.escreverCliente(clientes)
        return cliente

    }

    removerCliente(id: number): void {
        const clientes = this.lerClientes()
        const clientesIndex = clientes.findIndex(cliente => cliente.clienteId === Number(id))

        if (clientesIndex < 0) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        clientes.splice(clientesIndex)
        this.escreverCliente(clientes)
    }

}

