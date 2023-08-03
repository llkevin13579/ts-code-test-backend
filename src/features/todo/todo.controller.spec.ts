import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DbService } from '../../db/db.service';
import { DbModule } from '../../db/db.module';
import mockTodoData from '../../db/mock/mockTodoData';
import { Todo } from '../../features/todo/entities/todo.entity';

describe('TodoController', (): void => {
  let todoController: TodoController;
  let todoService: TodoService;
  let mockData: Todo[];

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [TodoController],
      providers: [TodoService, DbService],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
    mockData = mockTodoData();
  });

  it('create', async (): Promise<void> => {
    const spy = jest
      .spyOn(todoService, 'create')
      .mockImplementation(async () => {
        return;
      });
    const result = await todoController.create({
      title: 'test_title',
    });
    expect(spy).toBeCalled();
    expect(result).toEqual(undefined);
  });

  it('findAll', async (): Promise<void> => {
    const spy = jest
      .spyOn(todoService, 'findAll')
      .mockImplementation(async () => {
        return mockData;
      });
    const result = await todoController.findAll();
    expect(spy).toBeCalled();
    expect(result).toEqual(mockData);
  });

  it('findOne', async (): Promise<void> => {
    const spy = jest
      .spyOn(todoService, 'findOne')
      .mockImplementation(async () => {
        return mockData[0];
      });
    const result = await todoController.findOne('1');
    expect(spy).toBeCalled();
    expect(result).toEqual(mockData[0]);
  });

  it('update', async (): Promise<void> => {
    const spy = jest
      .spyOn(todoService, 'update')
      .mockImplementation(async () => {
        return;
      });
    const result = await todoController.update('1', { title: 'newTitle' });
    expect(spy).toBeCalled();
    expect(result).toEqual(undefined);
  });

  it('remove', async (): Promise<void> => {
    const spy = jest
      .spyOn(todoService, 'remove')
      .mockImplementation(async () => {
        return;
      });
    const result = await todoController.remove('1');
    expect(spy).toBeCalled();
    expect(result).toEqual(undefined);
  });
});
