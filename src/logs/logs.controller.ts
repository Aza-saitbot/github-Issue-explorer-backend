import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(@Body() logData: Partial<Log>): Promise<Log> {
    return this.logsService.create(logData);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
  ): Promise<{ data: Log[], total: number }> {
    return this.logsService.findAll(page, limit);
  }

}
