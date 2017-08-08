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
  gitRepo: {
    type: String,
    label: 'git URL to clone, push and fetch repo',
    unique: true,
  },
  githubUrl: {
    type: String,
    label: 'URL to access an example of the completed project',
    unique: true,
  },
  title: {
    type: String,
    label: 'The title of the project.',
    unique: true,
  },
  slug: {
    type: String,
    label: "The project's slug",
    unique: true,
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
  draft: {
    type: Boolean,
    label: 'Projects should begin as drafts',
    optional: true,
  },
  createdBy: {
    type: String,
    label: 'The project creator',
    optional: true,
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
