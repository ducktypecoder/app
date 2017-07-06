import { Meteor } from 'meteor/meteor';
import Projects from '../Projects';

function updateUserAnswer(user, projectDoc, step, answer) {
  const userProjects = user.projects || [];
  let userRecordForProject = userProjects.find(p => p._id == projectDoc._id);

  if (!userRecordForProject) {
    userProjects.push({ _id: projectDoc._id, answers: [] });
    userRecordForProject = userProjects.find(p => p._id == projectDoc._id);
  }

  const exisitingAnswer = userRecordForProject.answers.find(
    a => a.order == step,
  );
  if (exisitingAnswer) return; // already answered, we're done.

  const newAnswer = { order: step, answer };

  // TODO: refactor here to use Answers collection rather than append to user.
  userRecordForProject.answers.push(newAnswer);
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
    const projectDoc = Projects.findOne({ slug: project });

    if (!user) throw new Error('We could not find a user with that token.');
    if (!projectDoc) {
      throw new Error(
        'We could not find the project. Did you provide the correct project id?',
      );
    }

    console.log({ answer });

    if (answer) updateUserAnswer(user, projectDoc, step, answer);

    return {
      success: true,
      project: projectDoc.title,
      step,
      user: user.emails[0].address,
      answer,
    };
  } catch (e) {
    return {
      error: e.message,
      success: false,
    };
  }
}
