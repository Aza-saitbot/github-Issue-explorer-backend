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
  async getIssues(@Param('owner') owner: string, @Param('repo') repo: string) {
    const issues = await this.githubService.getIssues(owner, repo);
    await this.logsService.create({ ip: 'user_ip_placeholder', timestamp: new Date(), type: 'get_issues' });
    return issues;
  }

  @Get('repos/:owner/:repo/issues/:issueNumber')
  async getIssue(@Param('owner') owner: string, @Param('repo') repo: string, @Param('issueNumber') issueNumber: number) {
    const issue = await this.githubService.getIssue(owner, repo, issueNumber);
    await this.logsService.create({ ip: 'user_ip_placeholder', timestamp: new Date(), type: 'get_issue' });
    return issue;
  }

  @Get('search/issues')
  async searchIssues(@Query('q') query: string) {
    const issues = await this.githubService.searchIssues(query);
    await this.logsService.create({ ip: 'user_ip_placeholder', timestamp: new Date(), type: 'search_issues' });
    return issues;
  }
}
