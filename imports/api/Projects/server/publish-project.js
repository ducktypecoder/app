import { Random } from 'meteor/random';
import slugify from '../../Utility/slugify';
import getProjectConfigFromGithub from './get-project-config-from-github';
import Projects from '../Projects';

function stepContent(content) {
  return content.steps.map((s, i) => ({
    order: i + 1,
    content: s.content,
  }));
}

// https://blog.meteor.com/using-promises-and-async-await-in-meteor-8f6f4a04f998
export default (async function publishProject(repo, content) {
  try {
    const projectConfig = await getProjectConfigFromGithub(repo);
    const { projectName, author, githubUrl } = projectConfig;

    // TODO: validate that the content is not dangerous HTML like script tags,
    // so we can display it in the web app view.
    const projectData = {
      gitRepo: repo,
      githubUrl,
      title: projectName,
      slug: slugify(projectName),
      author,
      finalMessage: content.conclusion,
      description: content.introduction,
      steps: stepContent(content),
    };

    // QUESTION: what if we want to find by the git repo, but change the name?
    const existingProject = await Projects.rawCollection().findOne({
      slug: slugify(projectName),
      gitRepo: repo,
    });

    console.log({ projectData });

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
