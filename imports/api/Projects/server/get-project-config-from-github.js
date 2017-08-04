const GitHubApi = require('github');
const gh = require('parse-github-url');

const github = new GitHubApi({
  // optional
  debug: false,
  // protocol: 'https',
  // host: 'api.github.com', // should be api.github.com for GitHub
  // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
  // headers: {
  //     "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
  // },
  Promise: require('bluebird'),
  // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
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
