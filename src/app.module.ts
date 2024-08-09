/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './funcionarios/gerente.module';
import { ContaModule } from './contas/conta.module';
import { ClienteModule } from './clientes/cliente.module';
import { ClienteFabrica } from './clientes/fabricas/cliente.fabrica';
import { ContaFabrica } from './contas/fabricas/conta.fabrica';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
  controllers: [AppController],
  providers: [AppService, ClienteFabrica, ContaFabrica],
})
export class AppModule { }
