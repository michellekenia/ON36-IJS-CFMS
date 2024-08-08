import { Cliente } from 'src/clientes/models/cliente.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Conta } from 'src/contas/models/conta.interface';

@Injectable()
export class ClienteService {
    private readonly filePath = path.resolve('src/cliente/clientes.json')

    private lerClientes(): Cliente[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Cliente[];
    }


    private escreverCliente(clientes: Cliente[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
    }

    criarCliente(nome: string, endereco: string, telefone: string, gerenteId: number, contas: Conta[] = []): Cliente {
        const clientes = this.lerClientes()
        const novoCliente: Cliente = {
            clienteId:
                clientes.length > 0 ? clientes[clientes.length - 1].clienteId + 1 : 1,
            nome,
            endereco,
            telefone,
            gerenteId,
            contas
        }

        clientes.push(novoCliente)
        this.escreverCliente(clientes)
        return novoCliente

    }

    buscarTodos(): Cliente[] {
        return this.lerClientes()
    }

    buscarPorId(id: number): Cliente {
        const clientes = this.lerClientes()
        const cliente = clientes.find((cliente) => cliente.clienteId === Number(id))
        if (!cliente) {
            throw new NotFoundException(`Cliente de id ${id} não encontrado.`)
        }
        return cliente
    }

    alterarDadosClinte(id: number, novoNome: string, novoEndereco: string, novoTelefone: string): Cliente {
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

