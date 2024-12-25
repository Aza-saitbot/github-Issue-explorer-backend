import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 30,
  ): Promise<Log[]> {
    return this.logsService.findAll(page, limit);
  }

}
