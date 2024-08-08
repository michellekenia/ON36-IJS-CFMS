import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { Gerente } from './models/gerente';
import { Cliente } from 'src/clientes/models/cliente.interface';

@Controller('gerentes')
export class GerenteController {

    constructor(private readonly gerenteService: GerenteService) { }

    @Post()
    criarGerente(@Body('nome') nome: string, @Body('clientes') clientes: Cliente[]): Gerente {
        return this.gerenteService.criarGerente(nome, clientes)
    }

    @Get()
    buscarTodos(): Gerente[] {
        return this.gerenteService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): Gerente {
        return this.gerenteService.buscarPorId(id)
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
