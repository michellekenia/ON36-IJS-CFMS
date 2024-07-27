/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
