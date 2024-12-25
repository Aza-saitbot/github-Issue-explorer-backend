import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GithubService {
  private readonly apiUrl = process.env.GITHUB_API_URL;


  constructor(private readonly httpService: HttpService) {}

  async getIssues(owner: string, repo: string, page: number) {
    const response = await this.httpService.get(`${this.apiUrl}/repos/${owner}/${repo}/issues`, { params: { page } }).toPromise();
    return response.data;
  }

  async getIssue(owner: string, repo: string, issueNumber: number) {
    const response = await this.httpService.get(`${this.apiUrl}/repos/${owner}/${repo}/issues/${issueNumber}`).toPromise();
    return response.data;
  }

  async searchIssues(query: string) {
    const response = await this.httpService.get(`${this.apiUrl}/search/issues?q=${query}`).toPromise();
    return response.data;
  }
}
