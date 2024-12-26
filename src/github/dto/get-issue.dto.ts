import { IsNotEmpty, IsString } from 'class-validator';

export class GetIssueDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  repoName: string;
}
