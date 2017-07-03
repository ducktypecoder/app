import { Meteor } from 'meteor/meteor';
import Projects from '../Projects';

function updateUserAnswer(user, project, step, answer) {
  const userProjects = user.projects || [];
  let userRecordForProject = userProjects.find(p => p._id == project);

  if (!userRecordForProject) {
    userProjects.push({ _id: project, answers: [] });
    userRecordForProject = userProjects.find(p => p._id == project);
  }

  const answerForStep = userRecordForProject.answers.find(a => a.order == step);
  if (answerForStep) return; // already answered, we're done.

  userRecordForProject.answers.push({ order: step, answer });

  Meteor.users.update(
    { _id: user._id },
    {
      $set: { projects: userProjects },
    },
  );
}

// prettier-ignore
export default function checkAnswer({ token, project, step, answer }) {
  try {
    const user = Meteor.users.findOne({ token });
    if (!user) throw new Error('We could not find a user with that token.');

    const projectDoc = Projects.findOne({ _id: project });
    if (!projectDoc) {
      throw new Error(
        'We could not find the project. Did you provide the correct project id?',
      );
    }

    const correct =
      answer == projectDoc.steps.find(s => s.order == step).answer;

    if (correct) updateUserAnswer(user, project, step, answer);

    return {
      success: true,
      project: projectDoc.title,
      step,
      user: user.emails[0].address,
      correct,
    };
  } catch (e) {
    return {
      error: e.message,
      success: false,
    };
  }
}
