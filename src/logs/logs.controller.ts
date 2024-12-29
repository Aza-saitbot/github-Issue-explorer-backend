import { Controller, Get, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';
import { GetLogsDto } from './dto/get-logs.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {
  }

  @Get()
  async findAll(@Query() dto: GetLogsDto): Promise<Log[]> {
    return this.logsService.findAll(dto);
  }

}
