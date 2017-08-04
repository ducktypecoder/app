const GitHubApi = require('github');
const gh = require('parse-github-url');

const github = new GitHubApi({
  debug: false,
  Promise: require('bluebird'),
  timeout: 5000,
});

export default function getProjectConfigFromGithub(repoGitUrl) {
  const { owner, name } = gh(repoGitUrl);

  return github.repos
    .getContent({
      owner,
      repo: name,
      path: '/ducktypecoder/config.json',
      // ref: 'master',
    })
    .then((result) => {
      const encodedContent = result.data.content;
      const decodedBuffer = Buffer.from(encodedContent, 'base64');
      const decodedContent = decodedBuffer.toString('ascii');
      return JSON.parse(decodedContent);
    })
    .then(config => config);
}
