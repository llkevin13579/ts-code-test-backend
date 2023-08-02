import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DbService } from '../../db/db.service';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly db: DbService) {}

  /**
   * @description Crate todo record
   * @param createTodoDto Include a new title
   * @returns Status code 201 when create the new todo record successfully.
   */
  async create(createTodoDto: CreateTodoDto): Promise<void> {
    const sql = `
      INSERT INTO todos (title)
      VALUES($1);    
    `;
    await this.db.query(sql, [createTodoDto.title]);
  }

  /**
   * @description Find all todo records.
   * @returns Status code 200 with todo array when find all todo records successfully.
   */
  async findAll(): Promise<Todo[]> {
    const sql = 'select * from todos order by id';
    const result = await this.db.query(sql, []);
    return result;
  }

  /**
   * @description Find one todo record by todo id.
   * @param id Todo record id.
   * @returns Todo record.
   */
  async queryById(id: number): Promise<Todo[]> {
    const sql = 'select * from todos where id = $1';
    const result = await this.db.query(sql, [id]);
    return result;
  }

  /**
   * @description Find one todo record by todo id.
   * @param id Todo record id.
   * @param res Response object.
   * @returns Status code 200 with todo object when find successfully. Status code 404 when the record could not be found.
   */
  async findOne(id: number): Promise<Todo | void> {
    const result: Todo[] = await this.queryById(id);
    if (result && result.length === 1) {
      return result[0];
    } else {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * @description Update one todo record by todo id and new title.
   * @param id Todo record id.
   * @param updateTodoDto Include a new title
   * @param res Response object.
   * @returns Status code 200 when update successfully. Status code 404 when the record could not be found.
   */
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    const result = await this.queryById(id);
    if (result && result.length === 1) {
      const updateSql = 'update todos set title =$1 where id = $2';
      await this.db.query(updateSql, [updateTodoDto.title, id]);
      return;
    } else {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * @description Delete one todo record by todo id.
   * @param id Todo record id.
   * @param res Response object.
   * @returns Status code 200 when delete successfully. Status code 404 when the record could not be found.
   */
  async remove(id: number): Promise<void> {
    const result = await this.queryById(id);
    if (result && result.length === 1) {
      const sql = 'delete from todos where id = $1';
      await this.db.query(sql, [id]);
      return;
    } else {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
