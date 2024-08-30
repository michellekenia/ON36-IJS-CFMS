import { Module } from '@nestjs/common';
import { ClienteController } from 'src/adapters/cliente.controller';
import { ClienteService } from 'src/application/services/cliente.service';
import { ClienteFabrica } from 'src/domain/factories/cliente.fabrica';


@Module({
  providers: [ClienteService, ClienteFabrica],
  controllers: [ClienteController]
})
export class ClienteModule {}
