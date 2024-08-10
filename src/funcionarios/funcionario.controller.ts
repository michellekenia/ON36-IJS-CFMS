import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Gerente } from './models/gerente';
import { Cliente } from 'src/clientes/models/cliente.interface';
import { TFuncionario } from './factories/funcionario.fabrica';
import { TipoFuncionario } from './enums/tipo-funcionario.enum';

@Controller('funcionarios')
export class FuncionarioController {

    constructor(private readonly funcionarioService: FuncionarioService) { }

    @Post()
    criarGerente(
        @Body('tipo') tipo: TipoFuncionario,
        @Body('nome') nome: string): TFuncionario {
        return this.funcionarioService.criarFuncionario(tipo, nome)
    }

    @Get()
    buscarTodos(): TFuncionario[] {
        return this.funcionarioService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): TFuncionario {
        return this.funcionarioService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    alterarDadosClinte(@Param('id') id: number, @Body('nome') novoNome: string): TFuncionario {
        return this.funcionarioService.alterarDadosFuncionario(id, novoNome)
    }

    @Delete(':id/deletar')
    removerconta(@Param('id', ParseIntPipe) id: number): void {
        return this.funcionarioService.removerFuncionario(id)
    }

}
