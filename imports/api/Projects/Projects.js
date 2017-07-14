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
    optional: true,
  },
  finalMessage: {
    type: String,
    label: 'Message displayed after all passing all the steps',
    optional: true,
  },
  steps: {
    type: Array,
    optional: true,
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
  'steps.$.tests': {
    type: String,
    label: 'The stringified test suite for this step',
    optional: true,
  },
  author: {
    type: Object,
    optional: true,
  },
  'author.name': {
    type: String,
    optional: true,
  },
  'author.email': {
    type: String,
    optional: true,
  },
  'author.website': {
    type: String,
    optional: true,
  },
  'author.bio': {
    type: String,
    optional: true,
  },
  'author.avatar': {
    type: String,
    optional: true,
  },
  'author.companyName': {
    type: String,
    optional: true,
  },
  'author.companyWebsite': {
    type: String,
    optional: true,
  },
  'author.githubUrl': {
    type: String,
    optional: true,
  },
  'author.twitter': {
    type: String,
    optional: true,
  },
  'author.facebook': {
    type: String,
    optional: true,
  },
  'author.stackOverflow': {
    type: String,
    optional: true,
  },
  'author.linkedIn': {
    type: String,
    optional: true,
  },
  'author.other': {
    type: String,
    optional: true,
  },
});

Projects.attachSchema(Projects.schema);

export default Projects;
