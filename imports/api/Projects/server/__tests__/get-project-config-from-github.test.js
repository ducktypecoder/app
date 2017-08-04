import getProjectConfigFromGithub from '../get-project-config-from-github';

const repoGitUrl = 'git@github.com:ducktypecoder/hello-world.git';

// prettier-ignore
it('gets the ducktypecoder config file', (done) => { // eslint-disable-line
  getProjectConfigFromGithub(repoGitUrl)
    .then((config) => {
      expect(config.projectName).toEqual('Hello World');
      done();
    });
});
