import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioFabrica } from './factories/funcionario.fabrica';

@Module({
  providers: [FuncionarioService, FuncionarioFabrica],
  controllers: [FuncionarioController]
})
export class GerenteModule { }
