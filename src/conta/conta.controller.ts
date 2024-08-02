import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Conta, TipoConta } from './conta.model';

@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) {}

    @Post()
    criarConta(@Body('clienteId') clienteId: number, @Body('saldo') saldo: number, @Body('tipo') tipo: TipoConta): Conta {
        return this.contaService.criarConta(clienteId, saldo, tipo)
    }

    @Get()
    findAll(): Conta[] {
        return this.contaService.findAll()
    }

    @Get(':id/buscar')
    findById(@Param('id') id: number): Conta {
        return this.contaService.findById(id)
    }

    @Patch(':id/conta')
    alterarTipoConta(@Param('id') id: number, @Body('tipo') tipo: TipoConta): Conta {
        return this.contaService.alterarTipoConta(id, tipo)
    }

    @Patch(':id/saldo')
    alterarSaldo(@Param('id') id: number, @Body('saldo') novoSaldo: number): Conta {
        return this.contaService.alterarSaldo(id, novoSaldo)
    }

    @Delete(':id/deletar')
    removerconta(@Param('id', ParseIntPipe) id: number): void {
        return this.contaService.removerConta(id)
    }

}
