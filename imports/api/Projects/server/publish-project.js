import getProjectConfigFromGithub from './get-project-config-from-github'

export default function async publishProject(repo) {
  console.log('publishProject > repo: ', repo);

  const config = await getProjectConfigFromGithub(repo);

  console.log(config);
}
