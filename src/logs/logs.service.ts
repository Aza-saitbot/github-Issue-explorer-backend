import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {
  }

  async create(logData: Partial<Log>): Promise<Log> {
    const createdLog = new this.logModel(logData);
    return createdLog.save();
  }

  async findAll(page: number, limit: number): Promise<Log[]> {
    const skip = (page - 1) * limit;
    return await this.logModel.find().skip(skip).limit(limit).exec();
  }
}
