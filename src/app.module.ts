import { Module, MiddlewareConsumer, NestModule, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
import { GithubModule } from './github/github.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://saitbot:123@github-issues.1rcto.mongodb.net/github-issues?retryWrites=true&w=majority',
    ),
    LogsModule,
    GithubModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  onModuleInit() {
    this.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });
    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }
}
