import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateContaDto } from 'src/application/dto/conta/create-conta.dto';
import { ContaService } from 'src/application/services/conta.service';
import { TipoConta } from 'src/domain/enums/tipo-conta.enum';
import { TConta } from 'src/domain/factories/conta.fabrica';

@Controller('contas')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Post()
    async criarConta(
        @Body('clienteId') clienteId: number,
        @Body() contaDto: CreateContaDto): Promise <TConta>  {
        return this.contaService.criarConta(clienteId, contaDto)
    }

    @Get()
    async buscarTodos(): Promise <TConta[]> {
        return this.contaService.buscarTodos()
    }

    @Get(':id/buscar')
    async buscarPorId(
        @Param('id') id: number): Promise <TConta> {
        return this.contaService.buscarPorId(id)
    }

    @Patch(':id/alterar')
    async alterarConta(
        @Param('id') id: number, 
        @Body('tipo') novoTipo: CreateContaDto['tipo'],
        @Body('saldo') novoSaldo: CreateContaDto['saldo']
    ): Promise <TConta> {
        return this.contaService.alterarConta(id, novoTipo, novoSaldo)
    }

    @Delete(':id/deletar')
    async removerconta(
        @Param('id', ParseIntPipe) id: number): Promise <void> {
        return this.contaService.removerConta(id)
    }

}
