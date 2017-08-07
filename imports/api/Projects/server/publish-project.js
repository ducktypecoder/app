import slugify from '../../Utility/slugify';
import getProjectConfigFromGithub from './get-project-config-from-github';
import Projects from '../Projects';

export default (async function publishProject(repo) {
  const projectConfig = await getProjectConfigFromGithub(repo);

  const projectId = Projects.insert({
    gitRepo: repo,
    title: projectConfig.name,
    slug: slugify(projectConfig.name),
  });

  return {
    success: true,
    projectId,
  };
});
