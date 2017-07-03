import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
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

seeder(Projects, {
  environments: ['development', 'staging'],
  modelCount: 3,
  model(index, faker) {
    console.log('seeding Projects........');
    const projectCount = index + 1;
    return {
      author: 'foobar jones',
      title: `Project #${projectCount + 1}`,
      description: `This is the description of project #${projectCount + 1}`,
      steps: [
        { order: 1, content: 'This is step 1', answer: 'foobar1' },
        { order: 2, content: 'This is step 2', answer: 'foobar2' },
        { order: 3, content: 'This is step 3', answer: 'foobar3' },
        { order: 4, content: 'This is step 4', answer: 'foobar4' },
        { order: 5, content: 'This is step 5', answer: 'foobar5' },
      ],
    };
  },
});

function setToken(userId) {
  const newToken = Random.id(); // TODO: generate random api token
  Meteor.users.update(
    { _id: userId },
    {
      $set: { token: newToken },
    },
  );
}

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [
    {
      email: 'admin@test.com',
      password: 'testtest',
      token: Random.id(),
      profile: {
        name: {
          first: 'Andy',
          last: 'Warhol',
        },
      },
      roles: ['admin'],
      data(userId) {
        setToken(userId);
        return documentsSeed(userId);
      },
    },
  ],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
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
        return documentsSeed(userId);
      },
    };
  },
});
