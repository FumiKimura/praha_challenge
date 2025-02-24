import { OctokitClient } from '../octokit/client.js';

export const addComment = async ({
  owner,
  repositoryName,
  issueNumber,
  comment,
}: {
  owner: string;
  repositoryName: string;
  issueNumber: number;
  comment: string;
}) => {
  const result = await OctokitClient.getInstance().addComment({
    owner,
    repositoryName,
    issueNumber,
    comment,
  });
  return result.data;
};
