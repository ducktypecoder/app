import { Random } from 'meteor/random';
import slugify from '../../Utility/slugify';
import getProjectConfigFromGithub from './get-project-config-from-github';
import Projects from '../Projects';

// https://blog.meteor.com/using-promises-and-async-await-in-meteor-8f6f4a04f998
export default (async function publishProject(repo) {
  try {
    const projectConfig = await getProjectConfigFromGithub(repo);
    const { projectName, author } = projectConfig;
    const projectData = {
      gitRepo: repo,
      title: projectName,
      slug: slugify(projectName),
      author,
    };

    // QUESTION: what if we want to find by the git repo, but change the name?
    const existingProject = await Projects.rawCollection().findOne({
      slug: slugify(projectName),
      gitRepo: repo,
    });

    // update the existing
    if (existingProject) {
      await Projects.rawCollection().update(
        { _id: existingProject._id },
        {
          $set: projectData,
        },
      );
      return { success: true };
    }

    // Else, create the new project
    projectData._id = Random.id(); // using rawCollection, we need to manually set the document's _id
    await Projects.rawCollection().insert(projectData);

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
