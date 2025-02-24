import { Octokit, RestEndpointMethodTypes } from '@Octokit/rest';

export class OctokitClient {
  private static instance: OctokitClient;
  private octokit: Octokit;

  private constructor() {
    if (!process.env.ACCESS_TOKEN)
      throw new Error('Invalid access token: access token is not set');

    this.octokit = new Octokit({
      auth: process.env.ACCESS_TOKEN,
    });
  }

  public static getInstance() {
    if (!OctokitClient.instance) {
      OctokitClient.instance = new OctokitClient();
    }

    return OctokitClient.instance;
  }

  public getAllOpenIssues({
    owner,
    repositoryName,
  }: {
    owner: string;
    repositoryName: string;
  }): Promise<RestEndpointMethodTypes['issues']['listForRepo']['response']> {
    return this.octokit.issues.listForRepo({
      owner,
      repo: repositoryName,
    });
  }

  public addComment({
    owner,
    repositoryName,
    issueNumber,
    comment,
  }: {
    owner: string;
    repositoryName: string;
    issueNumber: number;
    comment: string;
  }): Promise<RestEndpointMethodTypes['issues']['createComment']['response']> {
    return this.octokit.issues.createComment({
      owner,
      repo: repositoryName,
      issue_number: issueNumber,
      body: comment,
    });
  }
}
