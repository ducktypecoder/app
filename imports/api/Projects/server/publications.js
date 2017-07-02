import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Projects from '../Projects';

Meteor.publish('projects', () => Projects.find({}));

// Note: projects.view is also used when editing an existing project.
Meteor.publish('projects.view', (projectId) => {
  check(projectId, String);
  return Projects.find({ _id: projectId });
});
