import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { LogsService } from '../logs/logs.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly logsService: LogsService,
  ) {}

  @Get('repos/:owner/:repo/issues')
  async getIssues(@Param('owner') owner: string, @Param('repo') repo: string,@Query('page') page: number = 1) {
    return await this.githubService.getIssues(owner, repo, page);
  }

  @Get('repos/:owner/:repo/issue/:issueNumber')
  async getIssue(@Param('owner') owner: string, @Param('repo') repo: string, @Param('issueNumber') issueNumber: number) {
    return await this.githubService.getIssue(owner, repo, issueNumber);
  }

  @Get('search/issues')
  async searchIssues(@Query('q') query: string) {
   return await this.githubService.searchIssues(query);
  }
}
