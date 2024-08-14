import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { ContaFabrica } from './fabricas/conta.fabrica';

@Module({
  providers: [ContaService, ContaFabrica],
  controllers: [ContaController]
})
export class ContaModule {}
