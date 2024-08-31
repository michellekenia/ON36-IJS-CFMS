import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateClienteDto } from 'src/application/dto/cliente/create-cliente.dto';
import { ClienteService } from 'src/application/services/cliente.service';

import { TCliente } from 'src/domain/factories/cliente.fabrica';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    async criarCliente(
        @Body() clienteDto: CreateClienteDto): Promise <TCliente> {
        return this.clienteService.criarCliente(clienteDto)

    }

    @Get()
    async buscarTodos(): Promise<TCliente[]> {
        return this.clienteService.buscarTodos()
    }

    @Get(':id/buscar')
    async buscarPorId(@Param('id') id: number): Promise<TCliente> {
        return this.clienteService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    async alterarDadosClinte(@Param('id') id: number, @Body() clienteDto: CreateClienteDto): Promise <TCliente> {
        return this.clienteService.alterarDadosClinte(id, clienteDto)
    }

    @Delete(':id/deletar')
    async removerCliente(@Param('id', ParseIntPipe) clienteId: number): Promise <void> {
        return this.clienteService.removerCliente(clienteId)
    }
   
}
