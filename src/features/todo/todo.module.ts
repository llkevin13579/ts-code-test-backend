import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DbModule } from '../../db/db.module';
import { DbService } from '../../db/db.service';

@Module({
  imports: [DbModule],
  controllers: [TodoController],
  providers: [TodoService, DbService],
})
export class TodoModule {}
