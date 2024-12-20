import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
import { GithubModule } from './github/github.module';
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
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });
    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }
}
