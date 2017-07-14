import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Documents from '../../api/Documents/Documents';
import Projects from '../../api/Projects/Projects';
import helloWorldProjectData from './hello-world-project-data';

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
  modelCount: 1,
  model(index, faker) {
    console.log('seeding hello-world project........');
    return helloWorldProjectData;
  },
});

seeder(Projects, {
  environments: ['development', 'staging'],
  modelCount: 3,
  model(index, faker) {
    console.log('seeding Projects........');
    const projectCount = index + 1;
    return {
      author: {
        name: 'Mark Hurwitz',
        email: 'mark@ducktypecoder.com',
        website: 'www.ducktypecoder',
        bio: 'Lorem ipsum developer dog cat puppy kitten',
        avatar: 'https://robohash.org/my-own-slug.png?size=50x50',
        companyName: 'Launch Brick Labs',
        companyWebsite: 'www.launchbricklabs.com',
        githubUrl: 'https://github.com/ducktypecoder',
        twitter: 'ducktypecoder',
        facebook: '',
        stackOverflow: '',
        linkedIn: '',
        other: 'https://www.mhurwi.com',
      },
      title: `Project #${projectCount + 1}`,
      slug: `project-#${projectCount + 1}`,
      description: `This is the description of project #${projectCount + 1}`,
      finalMessage:
        'Congratulations! You passed all the steps and now you are finished!',
      steps: [
        {
          order: 1,
          content: '<p>This is step 1</p>',
          tests: "it('works', () => expect(1).toEqual(1))",
        },
        {
          order: 2,
          content: '<p>This is step 2</p>',
          tests: "it('works', () => expect(1).toEqual(1))",
        },
        {
          order: 3,
          content: '<p>This is step 3</p>',
          tests: "it('works', () => expect(1).toEqual(1))",
        },
        {
          order: 4,
          content: '<p>This is step 4</p>',
          tests: "it('works', () => expect(1).toEqual(1))",
        },
        {
          order: 5,
          content: '<p>This is step 5</p>',
          tests: "it('works', () => expect(1).toEqual(1))",
        },
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
    console.log('seeding user...');
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
