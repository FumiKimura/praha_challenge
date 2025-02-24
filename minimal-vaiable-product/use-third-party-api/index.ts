import 'dotenv/config';
import { Methods } from './handlers/index.js';
import { getAllOpenIssues } from './handlers/get-all-open-issues.js';
import { addComment } from './handlers/add-comment.js';
import { Command } from 'commander';
const program = new Command();

program
  .requiredOption('-m, --method <type>', 'method')
  .requiredOption('-o, --owner <type>', 'repository owner')
  .requiredOption('-r, --repositoryName <type>', 'repository name')
  .option('-i, --issueNumber <type>', 'issue number')
  .option('-c, --comment <type>', 'comment');

program.parse();
const options = program.opts();

console.log('===Starting===');

try {
  switch (options.method) {
    case Methods.GET_ISSUES:
      console.log(
        await getAllOpenIssues({
          owner: options.owner,
          repositoryName: options.repositoryName,
        })
      );
      break;
    case Methods.ADD_COMMENT:
      console.log(
        await addComment({
          owner: options.owner,
          repositoryName: options.repositoryName,
          comment: options.comment,
          issueNumber: options.issueNumber,
        })
      );
      break;
    default:
      throw new Error('Invalid method: need valid method');
  }
} catch (error) {
  console.log(error);
}

console.log('===Finished===');
