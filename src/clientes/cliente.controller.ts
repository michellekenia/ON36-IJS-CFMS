import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './models/cliente.interface';
import { Conta } from 'src/contas/models/conta.interface';


@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    criarCliente(
        @Body('nome') nome: string,
        @Body('endereco') endereco: string,
        @Body('telefone') telefone: string,
        @Body('gerenteId') gerenteId: number,
        @Body('contas') contas: Conta[]
    ): Cliente {
        return this.clienteService.criarCliente(nome, endereco, telefone, gerenteId, contas)

    }

    @Get()
    buscarTodos(): Cliente[] {
        return this.clienteService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): Cliente {
        return this.clienteService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    alterarDadosClinte(@Param('id') id: number, @Body('nome') novoNome: string, @Body('endereco') novoEndereco: string, @Body('telefone') novoTelefone: string): Cliente {
        return this.clienteService.alterarDadosClinte(id, novoNome, novoEndereco, novoTelefone)
    }

    @Delete(':id/deletar')
    removerCliente(@Param('id', ParseIntPipe) clienteId: number): void {
        return this.clienteService.removerCliente(clienteId)
    }

}
