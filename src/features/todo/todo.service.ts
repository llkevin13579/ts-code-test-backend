import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DbService } from '../../db/db.service';
import { Todo } from './entities/todo.entity';
import { Response } from 'express';

@Injectable()
export class TodoService {
  constructor(private readonly db: DbService) {}

  async create(createTodoDto: CreateTodoDto): Promise<void> {
    const sql = `
      INSERT INTO todos (title)
      VALUES($1);    
    `;
    await this.db.query(sql, [createTodoDto.title]);
  }

  async findAll(): Promise<Todo[]> {
    const sql = 'select * from todos';
    const result = await this.db.query(sql, []);
    return result;
  }

  async queryById(id: number): Promise<Todo[]> {
    const sql = 'select * from todos where id = $1';
    const result = await this.db.query(sql, [id]);
    return result;
  }

  async findOne(id: number, @Res() res: Response): Promise<void> {
    const result: Todo[] = await this.queryById(id);
    if (result && result.length === 1) {
      res.status(HttpStatus.OK).send(result[0]);
    }
    res.status(HttpStatus.NOT_FOUND).send();
  }

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

  async remove(id: number, @Res() res: Response): Promise<void> {
    const result = await this.queryById(id);
    if (result && result.length === 1) {
      const sql = 'delete from todos where id = $1';
      await this.db.query(sql, [id]);
    }
    res.status(HttpStatus.NOT_FOUND).send();
  }
}
