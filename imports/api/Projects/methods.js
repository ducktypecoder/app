import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from './Projects';
import helloWorldProjectData from '../../startup/server/hello-world-project-data';

Meteor.methods({
  'projects.seed': function seedProject(opts) {
    // To overwrite the default 'hello-world' project:
    // Meteor.call('projects.seed', { force: true })
    // TODO: authorize only admins

    check(opts, {
      slug: Match.Maybe(String),
      force: Match.Maybe(Boolean),
    });

    const slug = opts.slug || 'hello-world';
    console.log('slug: ', slug);

    const projectDoc = Projects.findOne({ slug });
    console.log({ projectDoc });

    if (projectDoc && !opts.force) {
      console.log('project already exists. will not overwrite.');
      return;
    }

    // data defaults to 'hello-world' project
    let data;
    if (slug == 'hello-world') data = helloWorldProjectData;

    const result = Projects.insert(data);
    console.log({ result });
    return result;
  },
});

// rateLimit({
//   methods: [
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
