import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from './Projects';
import helloWorldProjectData from '../../startup/server/hello-world-project-data';

Meteor.methods({
  'projects.create': function createProject(title) {
    check(title, String);

    const slug = title.toLowerCase().replace(/ /gi, '-');
    const createdBy = this.userId;
    const draft = true;

    return Projects.insert({ title, slug, createdBy, draft });
  },
  'projects.update': function updateProject(doc) {
    check(doc, {
      _id: String,
      title: String,
      author: Match.Maybe(Object),
      description: Match.Maybe(String),
      finalMessage: Match.Maybe(String),
      gitRepo: Match.Maybe(String),
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
  'projects.publish': function publishProject(_id) {
    check(_id, String);

    const result = Projects.update(_id, { $set: { draft: false } });
    return result;
  },
  'projects.unpublish': function unpublishProject(_id) {
    check(_id, String);

    const result = Projects.update(_id, { $set: { draft: true } });
    return result;
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
    const createdBy = this.userId;

    if (projectDoc && !opts.force) {
      console.log('project already exists. will not overwrite.');
      return;
    }

    if (projectDoc) Projects.remove({ slug: projectDoc.slug });

    // data defaults to 'hello-world' project
    let data;
    if (slug == 'hello-world') data = helloWorldProjectData;

    data.createdBy = createdBy;

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
