import { Meteor } from 'meteor/meteor';
import Projects from '../Projects';

function getUserRecordForProject(user, projectDoc) {
  const userProjects = user.projects || [];
  const existingRecord = userProjects.find(p => p._id == projectDoc._id);
  const blankRecord = { _id: projectDoc._id, answers: [] };

  return existingRecord || blankRecord;
}

function getNextUnansweredStep(userRecordForProject) {
  const answers = userRecordForProject.answers;

  if (answers.length == 0) return 1; // if user hasnt started project, he's currently on step 1;

  // sort user's answers by step, and return the number of the next unanswered step;
  const sortedAnswers = answers.sort(a => a.step).reverse();
  console.log('user answers for project: ', sortedAnswers);

  const nextUnansweredStep = sortedAnswers[0].step + 1;
  console.log('nextUnansweredStep: ', nextUnansweredStep);

  return nextUnansweredStep;
}

// prettier-ignore
export default function getCurrentStep({ token, projectSlug }) {
  try {
    const user = Meteor.users.findOne({ token });
    const projectDoc = Projects.findOne({ slug: projectSlug });

    if (!user) throw new Error('We could not find a user with that token.');
    if (!projectDoc) {
      throw new Error(
        'We could not find the project. Did you provide the correct project id?',
      );
    }

    const userRecordForProject = getUserRecordForProject(user, projectDoc);
    const step = getNextUnansweredStep(userRecordForProject);

    return { step, success: true };
  } catch (e) {
    return {
      error: e.message,
      success: false,
    };
  }
}
