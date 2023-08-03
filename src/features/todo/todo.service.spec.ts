import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DbService } from '../../db/db.service';
import { TodoController } from './todo.controller';
import { DbModule } from '../../db/db.module';
import mockTodoData from '../../db/mock/mockTodoData';
import { Todo } from './entities/todo.entity';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoController: TodoController;
  let mockData: Todo[];
  let allResult: Todo[] = [];

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [TodoController],
      providers: [TodoService, DbService],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoController = module.get<TodoController>(TodoController);
    mockData = mockTodoData();
  });

  it('create', async (): Promise<void> => {
    jest.spyOn(todoController, 'create').mockImplementation(async () => {
      return;
    });
    const createResult = await todoService.create({
      title: 'test_title',
    });
    expect(createResult).toEqual(undefined);
  });

  it('findAll', async (): Promise<void> => {
    jest.spyOn(todoController, 'findAll').mockImplementation(async () => {
      return mockData;
    });
    allResult = await todoService.findAll();
    expect(allResult.length).toBeGreaterThan(0);
  });

  it('findOne(normal)', async (): Promise<void> => {
    const mockData: Todo = { id: allResult[0].id, title: allResult[0].title };
    jest.spyOn(todoController, 'findOne').mockImplementation(async () => {
      return mockData;
    });
    const result: Todo | void = await todoService.findOne(allResult[0].id);
    if (result) {
      expect(result.id).toBe(allResult[0].id);
    }
  });

  it('findOne(404)', async (): Promise<void> => {
    const mockData: Todo = { id: allResult[0].id, title: allResult[0].title };
    jest.spyOn(todoController, 'findOne').mockImplementation(async () => {
      return mockData;
    });
    const result: Todo | void | { error: any } = await todoService
      .findOne(99999)
      .catch((error) => ({ error }));
    expect(result).toHaveProperty('error');
  });

  it('update(normal)', async (): Promise<void> => {
    jest.spyOn(todoController, 'update').mockImplementation(async () => {
      return;
    });
    const result: Todo | void = await todoService.update(allResult[0].id, {
      title: 'updated text',
    });
    expect(result).toBe(undefined);
  });

  it('update(normal)', async (): Promise<void> => {
    jest.spyOn(todoController, 'update').mockImplementation(async () => {
      return;
    });
    const result: Todo | void | { error: any } = await todoService
      .update(999999999, {
        title: 'updated text',
      })
      .catch((error) => ({ error }));
    expect(result).toHaveProperty('error');
  });

  it('remove', async (): Promise<void> => {
    jest.spyOn(todoController, 'remove').mockImplementation(async () => {
      return;
    });
    const result: Todo | void = await todoService.remove(allResult[0].id);
    expect(result).toBe(undefined);
  });

  it('remove(404)', async (): Promise<void> => {
    jest.spyOn(todoController, 'remove').mockImplementation(async () => {
      return;
    });
    const result: Todo | void | { error: any } = await todoService
      .remove(allResult[0].id)
      .catch((error) => ({ error }));
    expect(result).toHaveProperty('error');
  });
});
