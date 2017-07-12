import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from './Projects';
import helloWorldProjectData from '../../startup/server/hello-world-project-data';

Meteor.methods({
  'projects.create': function createProject(title) {
    check(title, String);

    const slug = title.toLowerCase().replace(' ', '-');

    return Projects.insert({ title, slug });
  },
  'projects.update': function updateProject(doc) {
    check(doc, {
      _id: String,
      title: String,
      author: Match.Maybe(String),
      description: Match.Maybe(String),
      finalMessage: Match.Maybe(String),
      steps: Match.Maybe([Object]),
    });

    try {
      const projectId = doc._id;
      const result = Projects.update(projectId, { $set: doc });
      const updatedProject = Projects.findOne(projectId);
      return projectId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'projects.seed': function seedProject(opts) {
    // To overwrite the default 'hello-world' project:
    // Meteor.call('projects.seed', { force: true })
    // TODO: authorize only admins

    check(opts, {
      slug: Match.Maybe(String),
      force: Match.Maybe(Boolean),
    });

    const slug = opts.slug || 'hello-world';
    const projectDoc = Projects.findOne({ slug });

    if (projectDoc && !opts.force) {
      console.log('project already exists. will not overwrite.');
      return;
    }

    // data defaults to 'hello-world' project
    let data;
    if (slug == 'hello-world') data = helloWorldProjectData;

    const result = Projects.insert(data);
    return result;
  },
});

// rateLimit({
//   methods: [
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
