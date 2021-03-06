import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Projects from '../../api/Projects/Projects';
import helloWorldProjectData from './hello-world-project-data';

const projectSeed = userId => ({
  // wipe: true,
  collection: Projects,
  environments: ['development', 'staging'],
  modelCount: 1,
  model() {
    return Object.assign(
      {},
      {
        gitRepo: `github/${userId}/hello-${userId}`,
        title: `Project by ${userId}`,
        slug: `project-by-${userId}`,
        createdBy: userId,
        draft: true,
      },
    );
  },
});

const adminProjectSeed = userId => ({
  collection: Projects,
  environments: ['development', 'staging'],
  modelCount: 1,
  model() {
    return Object.assign({}, helloWorldProjectData, {
      createdBy: userId,
      draft: false,
    });
  },
});

// seeder(Projects, {
//   environments: ['development', 'staging'],
//   modelCount: 1,
//   model(index, faker) {
//     console.log('seeding hello-world project........');
//     return helloWorldProjectData;
//   },
// });

// seeder(Projects, {
//   environments: ['development', 'staging'],
//   modelCount: 3,
//   model(index, faker) {
//     console.log('seeding Projects........');
//     const projectCount = index + 1;
//     return {
//       author: {
//         name: 'Mark Hurwitz',
//         email: 'mark@ducktypecoder.com',
//         website: 'www.ducktypecoder',
//         bio: 'Lorem ipsum developer dog cat puppy kitten',
//         avatar: 'https://robohash.org/my-own-slug.png?size=50x50',
//         companyName: 'Launch Brick Labs',
//         companyWebsite: 'www.launchbricklabs.com',
//         githubUrl: 'https://github.com/ducktypecoder',
//         twitter: 'ducktypecoder',
//         facebook: '',
//         stackOverflow: '',
//         linkedIn: '',
//         other: 'https://www.mhurwi.com',
//       },
//       title: `Project #${projectCount + 1}`,
//       slug: `project-#${projectCount + 1}`,
//       description: `This is the description of project #${projectCount + 1}`,
//       finalMessage:
//         'Congratulations! You passed all the steps and now you are finished!',
//       steps: [
//         {
//           order: 1,
//           content: '<p>This is step 1</p>',
//           tests: "it('works', () => expect(1).toEqual(1))",
//         },
//         {
//           order: 2,
//           content: '<p>This is step 2</p>',
//           tests: "it('works', () => expect(1).toEqual(1))",
//         },
//         {
//           order: 3,
//           content: '<p>This is step 3</p>',
//           tests: "it('works', () => expect(1).toEqual(1))",
//         },
//         {
//           order: 4,
//           content: '<p>This is step 4</p>',
//           tests: "it('works', () => expect(1).toEqual(1))",
//         },
//         {
//           order: 5,
//           content: '<p>This is step 5</p>',
//           tests: "it('works', () => expect(1).toEqual(1))",
//         },
//       ],
//     };
//   },
// });

function setToken(userId) {
  const newToken = Random.id();
  Meteor.users.update(
    { _id: userId },
    {
      $set: { token: newToken },
    },
  );
}

seeder(Meteor.users, {
  // wipe: true,
  // noLimit: true,
  environments: ['development', 'staging'],
  modelCount: 6,
  model(index, faker) {
    if (index == 0) {
      console.log('seeding admin...');
      return {
        email: 'admin@test.com',
        password: 'testtest',
        profile: {
          name: {
            first: 'Andy',
            last: 'Warhol',
          },
        },
        roles: ['admin'],
        data(userId) {
          setToken(userId);
          return adminProjectSeed(userId);
        },
      };
    }

    console.log('seeding user...');
    return {
      email: `user${index}@test.com`,
      password: 'testtest',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        setToken(userId);
        return projectSeed(userId);
      },
    };
  },
});
