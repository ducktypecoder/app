import publishProject from '../publish-project';

const repoGitUrl = 'git@github.com:ducktypecoder/hello-world.git';

jest.mock('simpl-schema');

it('works', () => {
  publishProject(repoGitUrl);
});
