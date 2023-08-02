import { Todo } from '../../features/todo/entities/todo.entity';

const mockTodoData = (): Todo[] => {
  const todo1 = new Todo();
  todo1.id = 1;
  todo1.title = 'todo1';

  const todo2 = new Todo();
  todo2.id = 2;
  todo2.title = 'todo2';

  const mockTodos: Todo[] = [todo1, todo2];

  return mockTodos;
};

export default mockTodoData;
