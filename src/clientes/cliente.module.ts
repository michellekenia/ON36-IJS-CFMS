import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteFabrica } from './fabricas/cliente.fabrica';

@Module({
  providers: [ClienteService, ClienteFabrica],
  controllers: [ClienteController]
})
export class ClienteModule {}
