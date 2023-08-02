import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DbService } from '../../db/db.service';
import { Todo } from './entities/todo.entity';
import { Response } from 'express';

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
    const sql = 'select * from todos';
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
  async findOne(id: number, @Res() res: Response): Promise<void> {
    const result: Todo[] = await this.queryById(id);
    if (result && result.length === 1) {
      res.status(HttpStatus.OK).send(result[0]);
    }
    res.status(HttpStatus.NOT_FOUND).send();
  }

  /**
   * @description Update one todo record by todo id and new title.
   * @param id Todo record id.
   * @param updateTodoDto Include a new title
   * @param res Response object.
   * @returns Status code 200 when update successfully. Status code 404 when the record could not be found.
   */
  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.queryById(id);
    if (result && result.length === 1) {
      const updateSql = 'update todos set title =$1 where id = $2';
      await this.db.query(updateSql, [updateTodoDto.title, id]);
      res.status(HttpStatus.OK).send();
    }
    res.status(HttpStatus.NOT_FOUND).send();
  }

  /**
   * @description Delete one todo record by todo id.
   * @param id Todo record id.
   * @param res Response object.
   * @returns Status code 200 when delete successfully. Status code 404 when the record could not be found.
   */
  async remove(id: number, @Res() res: Response): Promise<void> {
    const result = await this.queryById(id);
    if (result && result.length === 1) {
      const sql = 'delete from todos where id = $1';
      await this.db.query(sql, [id]);
    }
    res.status(HttpStatus.NOT_FOUND).send();
  }
}
