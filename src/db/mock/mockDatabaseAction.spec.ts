import { MockTodoDatabaseAction } from './mockDatabaseAction';

describe('mockDatabaseAction', () => {
  it('findAll', async () => {
    const mockData = [
      { id: 1, title: 'todo1' },
      { id: 2, title: 'todo2' },
    ];
    const mockTodoDatabaseAction = new MockTodoDatabaseAction(mockData);
    const result = await mockTodoDatabaseAction.findAll();
    expect(result).toEqual(mockData);
  });
});
