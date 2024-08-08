import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ContaService } from './conta.service';
import { TipoConta } from './enums/tipo-conta.enum';
import { TConta } from './fabricas/conta.fabrica';


@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Post()
    criarConta(@Body('clienteId') clienteId: number, @Body('saldo') saldo: number, @Body('tipo') tipo: TipoConta, @Body('id') id: number): TConta {
        return this.contaService.criarConta(tipo, saldo, clienteId, id)
    }

    @Get()
    buscarTodos(): TConta[] {
        return this.contaService.buscarTodos()
    }

    @Get(':id/buscar')
    buscarPorId(@Param('id') id: number): TConta {
        return this.contaService.buscarPorId(id)
    }

    @Patch(':id/conta')
    alterarTipoConta(@Param('id') id: number, @Body('tipo') tipo: TipoConta): TConta {
        return this.contaService.alterarTipoConta(id, tipo)
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
