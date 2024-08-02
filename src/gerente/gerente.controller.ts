import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { Gerente } from './gerente.model';
import { Cliente } from 'src/cliente/cliente.model';

@Controller('gerentes')
export class GerenteController {

    constructor(private readonly gerenteService: GerenteService) {}

    @Post()
    criarGerente(@Body('nome') nome: string, @Body('clientes') clientes: Cliente[]): Gerente {
        return this.gerenteService.criarGerente(nome, clientes)
    }

    @Get()
    findAll(): Gerente[] {
        return this.gerenteService.findAll()
    }

    @Get(':id/buscar')
    findById(@Param('id') id: number): Gerente {
        return this.gerenteService.findById(id)
    }

    @Patch(':id/alterar')
    alterarDadosClinte(@Param('id') id: number, @Body('nome') novoNome: string): Gerente {
        return this.gerenteService.alterarDadosGerente(id, novoNome)
    }

    @Delete(':id/deletar')
    removerconta(@Param('id', ParseIntPipe) id: number): void {
        return this.gerenteService.removerGerente(id)
    }

}
