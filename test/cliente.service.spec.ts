import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from 'src/application/services/cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
