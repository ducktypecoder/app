import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/Documents/Documents';
import Projects from '../../api/Projects/Projects';

const documentsSeed = userId => ({
  collection: Documents,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      owner: userId,
      title: `Document #${dataIndex + 1}`,
      body: `This is the body of document #${dataIndex + 1}`,
    };
  },
});

// const projectsSeed = () => ({
//   collection: Projects,
//   environments: ['development', 'staging'],
//   noLimit: true,
//   modelCount: 5,
//   model(dataIndex) {
//     return {
//       author: 'foobar jones',
//       title: `Project #${dataIndex + 1}`,
//       description: `This is the description of project #${dataIndex + 1}`,
//     };
//   },
// });

seeder(Projects, {
  modelCount: 3,
  model(index, faker) {
    const projectCount = index + 1;
    return {
      author: 'foobar jones',
      title: `Project #${projectCount + 1}`,
      description: `This is the description of project #${projectCount + 1}`,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [
    {
      email: 'admin@admin.com',
      password: 'password',
      profile: {
        name: {
          first: 'Andy',
          last: 'Warhol',
        },
      },
      roles: ['admin'],
      data(userId) {
        return documentsSeed(userId);
      },
    },
  ],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return documentsSeed(userId);
      },
    };
  },
});
