import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
describe('PropertiesController', () => {
  let controller: PropertiesController;

  const mockPropertiesService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [PropertiesService],
    })
      .overrideProvider(PropertiesService)
      .useValue(mockPropertiesService)
      .compile();
    controller = module.get<PropertiesController>(PropertiesController);
  });

  it('should be defined', () => {
    expect(PropertiesController).toBeDefined();
  });
});
