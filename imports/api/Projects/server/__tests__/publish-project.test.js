import publishProject from '../publish-project';

const repoGitUrl = 'git@github.com:ducktypecoder/hello-world.git';

it('works', () => {
  publishProject(repoGitUrl);
});
