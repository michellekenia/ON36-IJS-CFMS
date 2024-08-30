import { Module } from '@nestjs/common';
import { FuncionarioController } from 'src/adapters/funcionario.controller';
import { FuncionarioService } from 'src/application/services/funcionario.service';
import { FuncionarioFabrica } from 'src/domain/factories/funcionario.fabrica';


@Module({
  providers: [FuncionarioService, FuncionarioFabrica],
  controllers: [FuncionarioController]
})
export class GerenteModule { }
