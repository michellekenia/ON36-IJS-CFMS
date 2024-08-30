import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClienteService } from 'src/application/services/cliente.service';
import { TipoCliente } from 'src/domain/enums/tipo-cliente.enum';
import { TCliente } from 'src/domain/factories/cliente.fabrica';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    criarCliente(
        @Body('tipo') tipo: TipoCliente,
        @Body('nome') nome: string,
        @Body('endereco') endereco: string,
        @Body('telefone') telefone: string): TCliente {
        return this.clienteService.criarCliente(tipo, nome, endereco, telefone)

    }

    @Get()
    buscarTodos(): TCliente[] {
        return this.clienteService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): TCliente {
        return this.clienteService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    alterarDadosClinte(@Param('id') id: number, @Body('nome') novoNome: string, @Body('endereco') novoEndereco: string, @Body('telefone') novoTelefone: string): TCliente {
        return this.clienteService.alterarDadosClinte(id, novoNome, novoEndereco, novoTelefone)
    }

    @Delete(':id/deletar')
    removerCliente(@Param('id', ParseIntPipe) clienteId: number): void {
        return this.clienteService.removerCliente(clienteId)
    }

}
