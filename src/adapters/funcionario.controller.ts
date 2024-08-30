import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FuncionarioService } from 'src/application/services/funcionario.service';
import { TipoFuncionario } from 'src/domain/enums/tipo-funcionario.enum';
import { TFuncionario } from 'src/domain/factories/funcionario.fabrica';

@Controller('funcionarios')
export class FuncionarioController {

    constructor(private readonly funcionarioService: FuncionarioService) { }

    @Post()
    criarFuncionario(
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
    alterarDadosFuncionario(@Param('id') id: number, @Body('nome') novoNome: string): TFuncionario {
        return this.funcionarioService.alterarDadosFuncionario(id, novoNome)
    }

    @Delete(':id/deletar')
    removerFuncionario(@Param('id', ParseIntPipe) id: number): void {
        return this.funcionarioService.removerFuncionario(id)
    }

}
