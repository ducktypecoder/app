import { Meteor } from 'meteor/meteor';
import Projects from '../Projects';

module.exports = function getCurrentStep(data) {
  const user = Meteor.users.findOne({ token: data.token });

  const projectDoc = Projects.findOne({ slug: data.projectSlug });
  if (!projectDoc) return {};

  // get all the project steps, in order, and check on the user
  const orderedSteps = projectDoc.steps.sort(s => s.order).reverse();

  // return the first step if user is not logged in
  // or hasnt started ay projects yet
  if (!user) return orderedSteps[0];
  if (!user.projects) return orderedSteps[0];

  // get the answers that the user has submitted for this project
  const userProjectRecord = user.projects.filter(
    p => p._id == projectDoc._id,
  )[0];

  // return the first step if user has not yet started this specific project
  if (!userProjectRecord) return orderedSteps[0];

  // in the user's answers, get the highest ordered step that has been answered
  const userAnswers = userProjectRecord.answers;

  const usersMostRecentStep = userAnswers.sort(s => s.order)[0];

  // return the step that comes next (step order is 1 based,
  // but orderedSteps array indices are 0 based)
  const nextStepOrder = Number(usersMostRecentStep.order) + 1;
  const currentStep = orderedSteps.find(s => s.order == nextStepOrder);

  return currentStep || { finished: true };
};

// function getUserRecordForProject(user, projectDoc) {
//   const userProjects = user.projects || [];
//   const existingRecord = userProjects.find(p => p._id == projectDoc._id);
//   const blankRecord = { _id: projectDoc._id, answers: [] };
//
//   return existingRecord || blankRecord;
// }
//
// function getNextUnansweredStep(userRecordForProject) {
//   const answers = userRecordForProject.answers;
//   return answers.length + 1;
// }
//
// // prettier-ignore
// export default function getCurrentStep({ token, projectSlug }) {
//   try {
//     const user = Meteor.users.findOne({ token });
//     const projectDoc = Projects.findOne({ slug: projectSlug });
//
//     if (!user) throw new Error('We could not find a user with that token.');
//     if (!projectDoc) {
//       throw new Error(
//         'We could not find the project. Did you provide the correct project id?',
//       );
//     }
//
//     const userRecordForProject = getUserRecordForProject(user, projectDoc);
//     const step = getNextUnansweredStep(userRecordForProject);
//
//     return { step, success: true };
//   } catch (e) {
//     return {
//       error: e.message,
//       success: false,
//     };
//   }
// }
