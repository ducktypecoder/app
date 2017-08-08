const GitHubApi = require('github');
const gh = require('parse-github-url');

const github = new GitHubApi({
  debug: false,
  headers: {
    'user-agent': 'Ducktypecoder-App', // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  timeout: 5000,
});

function repoHtmlUrlFromResult(result) {
  return result.data.html_url.replace(/\/blob.+.json/, '');
}

export default (async function getProjectConfigFromGithub(repoGitUrl) {
  console.log('getProjectConfigFromGithub');
  const { owner, name } = gh(repoGitUrl);

  const result = await github.repos.getContent({
    owner,
    repo: name,
    path: '/ducktypecoder/config.json',
  });
  console.log({ githubResponse: result });
  const encodedContent = result.data.content;
  const decodedBuffer = Buffer.from(encodedContent, 'base64');
  const decodedContent = decodedBuffer.toString('ascii');
  const config = JSON.parse(decodedContent);

  // 'https://github.com/ducktypecoder/hello-world/blob/master/ducktypecoder/config.json'
  config.githubUrl = repoHtmlUrlFromResult(result);

  return config;
});
