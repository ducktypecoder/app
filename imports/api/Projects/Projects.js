/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Projects = new Mongo.Collection('Projects');

Projects.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Projects.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Projects.schema = new SimpleSchema({
  author: {
    type: String,
    label: "The author's name.",
  },
  createdAt: {
    type: String,
    label: 'The date this project was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this project was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the project.',
  },
  slug: {
    type: String,
    label: "The project's slug",
  },
  description: {
    type: String,
    label: 'The description of the project.',
  },
  finalMessage: {
    type: String,
    label: 'Message displayed after all passing all the steps',
  },
  steps: {
    type: Array,
  },
  'steps.$': {
    type: Object,
  },
  'steps.$.order': {
    type: Number,
    label: 'The order of this step in relation to other steps',
  },
  'steps.$.content': {
    type: String,
    label: 'Content for this step',
  },
  'steps.$.answer': {
    type: String,
    label: 'The correct answer to solve this step',
    optional: true,
  },
});

Projects.attachSchema(Projects.schema);

export default Projects;
