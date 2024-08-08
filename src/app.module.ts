/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './funcionarios/gerente.module';
import { ContaModule } from './contas/conta.module';
import { ClienteModule } from './clientes/cliente.module';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
