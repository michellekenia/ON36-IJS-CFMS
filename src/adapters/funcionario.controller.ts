import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateFuncionarioDto } from 'src/application/dto/funcionario/create-funcionario.dto';
import { FuncionarioService } from 'src/application/services/funcionario.service';
import { TFuncionario } from 'src/domain/factories/funcionario.fabrica';

@Controller('funcionarios')
export class FuncionarioController {

    constructor(private readonly funcionarioService: FuncionarioService) { }

    @Post()
    async criarFuncionario(
        @Body() funcionarioDto: CreateFuncionarioDto): Promise<TFuncionario> {
        return this.funcionarioService.criarFuncionario(funcionarioDto)
    }

    @Get()
    async buscarTodos(): Promise<TFuncionario[]> {
        return this.funcionarioService.buscarTodos()
    }

    @Get(':id/buscar')
    async buscarPorId(
        @Param('id') id: number): Promise<TFuncionario> {
        return this.funcionarioService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    async alterarDadosFuncionario(
        @Param('id') id: number, @Body() funcionarioDto: CreateFuncionarioDto): Promise<TFuncionario> {
        return this.funcionarioService.alterarDadosFuncionario(id, funcionarioDto)
    }

    @Delete(':id/deletar')
    async removerFuncionario(
        @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.funcionarioService.removerFuncionario(id)
    }

}
