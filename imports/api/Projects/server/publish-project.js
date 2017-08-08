import { Random } from 'meteor/random';
import slugify from '../../Utility/slugify';
import getProjectConfigFromGithub from './get-project-config-from-github';
import Projects from '../Projects';

export default (async function publishProject(repo) {
  try {
    const projectConfig = await getProjectConfigFromGithub(repo);
    const { projectName } = projectConfig;

    // https://blog.meteor.com/using-promises-and-async-await-in-meteor-8f6f4a04f998
    await Projects.rawCollection().insert({
      _id: Random.id(),
      gitRepo: repo,
      title: projectName,
      slug: slugify(projectName),
    });

    return { success: true };
  } catch (e) {
    if (e.message.includes('gitRepo dup key')) {
      return {
        success: false,
        error: 'A project already exists with that git repo.',
      };
    }

    if (e.message.includes('title dup key')) {
      return {
        success: false,
        error: 'A project already exists with that name.',
      };
    }

    return { success: false, error: e.message };
  }
});
