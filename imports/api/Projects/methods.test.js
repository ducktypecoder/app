// /* eslint-env mocha */
// /* eslint-disable func-names, prefer-arrow-callback */
// import { Meteor } from 'meteor/meteor';
// import { chai } from 'meteor/practicalmeteor:chai';
// import seeder from '@cleverbeagle/seeder';
//
// import './methods.js';
// import Projects from './Projects';
//
// describe('project methods', function () {
//   it('gets the next unanswered step', function () {
//     const projectData = {
//       author: 'foobar jones',
//       title: 'Project 1',
//       description: 'This is the description of project 1',
//       steps: [
//         { order: 1, content: 'This is step 1', answer: 'foobar1' },
//         { order: 2, content: 'This is step 2', answer: 'foobar2' },
//         { order: 3, content: 'This is step 3', answer: 'foobar3' },
//         { order: 4, content: 'This is step 4', answer: 'foobar4' },
//         { order: 5, content: 'This is step 5', answer: 'foobar5' },
//       ],
//     };
//     const projectsSeed = userId => ({
//       collection: Projects,
//       environments: ['development', 'staging', 'test'],
//       noLimit: true,
//       modelCount: 5,
//       model() {
//         return projectData;
//       },
//     });
//
//     seeder(Meteor.users, {
//       wipe: true,
//       environments: ['development', 'staging'],
//       noLimit: true,
//       data: [
//         {
//           email: 'admin@admin.com',
//           password: 'password',
//           profile: {
//             name: {
//               first: 'Andy',
//               last: 'Warhol',
//             },
//           },
//           roles: ['admin'],
//         },
//       ],
//       modelCount: 5,
//       model(index, faker) {
//         const userCount = index + 1;
//         return {
//           email: `user+${userCount}@test.com`,
//           password: 'password',
//           profile: {
//             name: {
//               first: faker.name.firstName(),
//               last: faker.name.lastName(),
//             },
//           },
//           roles: ['user'],
//           data(userId) {
//             return projectsSeed(userId);
//           },
//         };
//       },
//     });
//
//     const project = Projects.findOne();
//     const user = Meteor.users.findOne();
//     const result = Meteor.call('projects.nextUnansweredStep', user, project);
//
//     chai.assert.equal(result.order, 1);
//   });
// });
