import { Module } from '@nestjs/common';
import { ContaController } from 'src/adapters/conta.controller';
import { ContaService } from 'src/application/services/conta.service';
import { ContaFabrica } from 'src/domain/factories/conta.fabrica';


@Module({
  providers: [ContaService, ContaFabrica],
  controllers: [ContaController]
})
export class ContaModule {}
