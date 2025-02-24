import { OctokitClient } from '../octokit/client.js';

export const getAllOpenIssues = async ({
  owner,
  repositoryName,
}: {
  owner: string;
  repositoryName: string;
}) => {
  const result = await OctokitClient.getInstance().getAllOpenIssues({
    owner,
    repositoryName,
  });
  return result.data;
};
