import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ContaService } from './conta.service';
import { TipoConta } from './enums/tipo-conta.enum';
import { TConta } from './fabricas/conta.fabrica';
import { TCliente } from 'src/clientes/fabricas/cliente.fabrica';


@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Post()
    criarConta(
        @Body('tipo') tipo: TipoConta,
        @Body('saldo') saldo: number,
        @Body('clienteId') clienteId: number): TConta  {
        return this.contaService.criarConta(tipo, saldo, clienteId)
    }

    @Get()
    buscarTodos(): TConta[] {
        return this.contaService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): TConta {
        return this.contaService.buscarPorId(id)
    }

    @Patch(':id/tipo')
    alterarTipoConta(@Param('id') id: number, @Body('tipo') novoTipo: TipoConta): TConta {
        return this.contaService.alterarTipoConta(id, novoTipo)
    }

    @Patch(':id/saldo')
    alterarSaldo(@Param('id') id: number, @Body('saldo') novoSaldo: number): TConta {
        return this.contaService.alterarSaldo(id, novoSaldo)
    }

    @Delete(':id/deletar')
    removerconta(@Param('id', ParseIntPipe) id: number): void {
        return this.contaService.removerConta(id)
    }

}
