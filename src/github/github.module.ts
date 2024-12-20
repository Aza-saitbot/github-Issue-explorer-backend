import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [LogsModule, HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
