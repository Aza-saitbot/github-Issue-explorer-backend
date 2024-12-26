import { IsNotEmpty, IsString } from 'class-validator';

export class SearchIssuesDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsString()
  page?: number;
}
