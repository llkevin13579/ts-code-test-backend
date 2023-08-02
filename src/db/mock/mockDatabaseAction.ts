import { Todo } from '../../features/todo/entities/todo.entity';

export class MockTodoDatabaseAction {
  private mockTodos: Todo[] = [];

  constructor(mockTodos: Todo[]) {
    this.mockTodos = mockTodos;
  }

  async findAll(): Promise<Todo[]> {
    return this.mockTodos;
  }
}
