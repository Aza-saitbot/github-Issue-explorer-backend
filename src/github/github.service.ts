import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetIssuesDto } from './dto/get-issues.dto';
import { GetIssueDto } from './dto/get-issue.dto';
import { SearchIssuesDto } from './dto/search-issues.dto';

@Injectable()
export class GithubService {
  private readonly apiUrl = process.env.GITHUB_API_URL;


  constructor(private readonly httpService: HttpService) {
  }

  async getIssues(dto: GetIssuesDto) {
    const { repoName, userName, page = 1 } = dto;
    try {
      const response = await this.httpService.get(`${this.apiUrl}/repos/${userName}/${repoName}/issues`, { params: { page } }).toPromise();
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getIssue(issueNumber: number, dto: GetIssueDto) {
    const { repoName, userName } = dto;
    try {
      const response = await this.httpService.get(`${this.apiUrl}/repos/${userName}/${repoName}/issues/${issueNumber}`).toPromise();
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async searchIssues(dto: SearchIssuesDto) {
    const { query, page = 1 } = dto;
    try {
      const response = await this.httpService.get(`${this.apiUrl}/search/issues?q=${query}`, { params: { page } }).toPromise();
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
