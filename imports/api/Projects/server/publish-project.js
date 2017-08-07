import slugify from '../../Utility/slugify';
import getProjectConfigFromGithub from './get-project-config-from-github';
import Projects from '../Projects';

export default (async function publishProject(repo) {
  const config = await getProjectConfigFromGithub(repo);

  // validate project
  //  - uniqueness of repo
  //  - uniqueness of name
  //  - uniqueness of slug

  // save project data:
  //  - github repo
  //  - projectName
  //  - slugified name

  Projects.insert({
    gitRepo: repo,
    title: config.name,
    slug: slugify(config.name),
  });

  return {
    success: true,
    config,
  };
});
