import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DbService } from '../../db/db.service';
import { TodoController } from './todo.controller';
import { DbModule } from '../../db/db.module';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [TodoController],
      providers: [TodoService, DbService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
