import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Projects from '../Projects';

Meteor.publish('projects', function publishProjects() {
  const userIsAdmin = Roles.userIsInRole(this.userId, ['admin']);

  if (userIsAdmin) return Projects.find();

  return Projects.find({
    $or: [{ createdBy: this.userId }, { draft: { $ne: true } }],
  });
});

Meteor.publish('projects.view', function publishProjectsView(projectId) {
  check(projectId, String);

  const userIsAdmin = Roles.userIsInRole(this.userId, ['admin']);

  if (userIsAdmin) return Projects.find({ _id: projectId });

  return Projects.find({
    _id: projectId,
    $or: [{ createdBy: this.userId }, { draft: { $ne: true } }],
  });
});

Meteor.publish('projects.edit', function publishProjectsView(projectId) {
  check(projectId, String);

  const userIsAdmin = Roles.userIsInRole(this.userId, ['admin']);

  if (userIsAdmin) return Projects.find({ _id: projectId });

  return Projects.find({
    _id: projectId,
    createdBy: this.userId,
  });
});
