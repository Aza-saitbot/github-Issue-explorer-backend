import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { GetIssueDto } from './dto/get-issue.dto';
import { GetIssuesDto } from './dto/get-issues.dto';
import { SearchIssuesDto } from './dto/search-issues.dto';
import { LogType } from '../decorators/log-type.decorator';

@Controller('issues')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Get('/search')
  @LogType('search_issues')
  async searchIssues(@Query() dto: SearchIssuesDto) {
    return await this.githubService.searchIssues(dto);
  }

  @Get()
  @LogType('get_issues')
  async getIssues(@Query() dto: GetIssuesDto) {
    return await this.githubService.getIssues(dto);
  }

  @Get('/:issueNumber')
  @LogType('get_issue')
  async getIssue(
    @Param('issueNumber') issueNumber: number,
    @Query() dto: GetIssueDto,
  ) {
    return await this.githubService.getIssue(issueNumber, dto);
  }
}
