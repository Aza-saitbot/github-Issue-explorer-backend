import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { GetLogsDto } from './dto/get-logs.dto';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {
  }

  async create(logData: Partial<Log>): Promise<Log> {
    const createdLog = new this.logModel(logData);
    return createdLog.save();
  }

  async findAll(dto: GetLogsDto): Promise<Log[]> {
    const { page = 1, limit = 30 } = dto;

    const validatedPage = Math.max(page, 1);
    const validatedLimit = Math.max(limit, 1);

    const skip = (validatedPage - 1) * validatedLimit;
    return await this.logModel
      .find()
      .skip(skip)
      .limit(validatedLimit)
      .select('_id ip dt type')
      .exec();
  }

}
