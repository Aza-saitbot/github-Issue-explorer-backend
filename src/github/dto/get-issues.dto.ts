import { IsNotEmpty, IsString } from 'class-validator';

export class GetIssuesDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  repoName: string;

  @IsString()
  page?: number;
}
