import { Meteor } from 'meteor/meteor';
import Projects from './Projects';

Meteor.methods({
  'projects.nextUnansweredStep': function nextUnansweredStep(user, project) {
    console.log('user: ', user);
    console.log('project: ', project);
    const orderedSteps = project.steps.sort(s => s.order);

    if (!user) return orderedSteps[0];

    const userAnswers = user.projects.filter(p => p._id == project._id);

    return { order: 'foobar' };
  },
});

// rateLimit({
//   methods: [
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
