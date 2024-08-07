import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Conta } from 'src/conta/conta.model';


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
    findAll(): Cliente[] {
        return this.clienteService.findAll()
    }

    @Get(':id/buscar')
    findById(@Param('id') id: number): Cliente {
        return this.clienteService.findById(id)
    }

    @Patch(':id/alterar')
    alterarDadosClinte(@Param('id') id: number, @Body('nome') novoNome: string, @Body('endereco') novoEndereco: string, @Body('telefone') novoTelefone: string): Cliente {
        return this.clienteService.alterarDadosClinte(id, novoNome, novoEndereco, novoTelefone)
    }

    @Delete(':id/deletar')
    removerconta(@Param('id', ParseIntPipe) clienteId: number): void {
        return this.clienteService.removerCliente(clienteId)
    }

}
