import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record is successfully created.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Title field is not included in the payload./Title is not string format./Title length should between 1 and 100',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All records have already retrieved.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Current record has already retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Current record could not be found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findOne(@Param('id') id: string): Promise<Todo | void> {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Current record has already updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Current record could not be found.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Title field is not included in the payload./Title is not string format./Title length should between 1 and 100',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Current record has already deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Current record could not be found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
