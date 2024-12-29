import { IsString } from 'class-validator';

export class GetLogsDto {
  @IsString()
  page?: number;

  @IsString()
  limit?: number;
}
