/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaFabrica } from './domain/factories/conta.fabrica';
import { FuncionarioFabrica } from './domain/factories/funcionario.fabrica';
import { ClienteModule } from './modules/cliente.module';
import { ContaModule } from './modules/conta.module';
import { GerenteModule } from './modules/funcionario.module';
import { ClienteFabrica } from './domain/factories/cliente.fabrica';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
  controllers: [AppController],
  providers: [AppService, ClienteFabrica, ContaFabrica, FuncionarioFabrica],
})
export class AppModule { }
