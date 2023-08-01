import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  id: number;

  @ApiProperty()
  title: string;
}
