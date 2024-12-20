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

  async findAll(page: number, limit: number): Promise<{ data: Log[], total: number }> {
    const total = await this.logModel.countDocuments().exec();
    const skip = (page - 1) * limit;
    const logs = await this.logModel.find().skip(skip).limit(limit).exec();

    return { data: logs, total };
  }
}
