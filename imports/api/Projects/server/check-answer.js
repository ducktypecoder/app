import { Meteor } from 'meteor/meteor';
import Projects from '../Projects';

function updateUserAnswer(user, projectDoc, step, answer) {
  // don't do anything if the step is null
  if (!step) return;

  // find the user's record for this specific project
  const userProjects = user.projects || [];
  let userRecordForProject = userProjects.find(p => p._id == projectDoc._id);

  // if the user has not yet started this project, set it up and find it again.
  if (!userRecordForProject) {
    userProjects.push({ _id: projectDoc._id, answers: [] });
    userRecordForProject = userProjects.find(p => p._id == projectDoc._id);
  }

  // do not do anything if the user has already answered this step;
  const exisitingAnswer = userRecordForProject.answers.find(
    a => a.order == step //eslint-disable-line
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
    // Find the user and the project
    const user = Meteor.users.findOne({ token });
    const projectDoc = Projects.findOne({ slug: project });

    // Bail if we can't find one or the other
    if (!user) throw new Error('We could not find a user with that token.');
    if (!projectDoc) {
      throw new Error(
        'We could not find the project. Did you provide the correct project id?',
      );
    }

    // Update the user if the answer checks out (if all the user's tests passed for this step);
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
