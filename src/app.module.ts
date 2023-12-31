import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.ENV ?? 'local'}`],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
