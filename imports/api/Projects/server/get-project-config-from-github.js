const GitHubApi = require('github');
const gh = require('parse-github-url');

const github = new GitHubApi({
  debug: false,
  Promise: require('bluebird'),
  timeout: 5000,
});

export default (async function getProjectConfigFromGithub(repoGitUrl) {
  console.log('getProjectConfigFromGithub');
  const { owner, name } = gh(repoGitUrl);

  const result = await github.repos.getContent({
    owner,
    repo: name,
    path: '/ducktypecoder/config.json',
  });
  const encodedContent = result.data.content;
  const decodedBuffer = Buffer.from(encodedContent, 'base64');
  const decodedContent = decodedBuffer.toString('ascii');
  const config = JSON.parse(decodedContent);

  return config;
});
