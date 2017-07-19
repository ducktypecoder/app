import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Projects from '../../../api/Projects/Projects';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import ViewProjectAuthor from './ViewProjectAuthor';

// TODO: refactor this into a reusable module
function nextUnansweredStep(project) {
  if (!project) return {};

  // get all the project steps, in order, and check on the user
  const orderedSteps =
    (project.steps && project.steps.sort(s => s.order).reverse()) || [];

  const user = Meteor.user();

  // return the first step if user is not logged in
  // or hasnt started ay projects yet
  if (!user) return orderedSteps[0];
  if (!user.projects) return orderedSteps[0];

  // get the answers that the user has submitted for this project
  const userProjectRecord = user.projects.filter(p => p._id == project._id)[0];

  // return the first step if user has not yet started this specific project
  if (!userProjectRecord) return orderedSteps[0];

  // in the user's answers, get the highest ordered step that has been answered
  const userAnswers = userProjectRecord.answers;

  const usersMostRecentStep = userAnswers.sort(s => s.order)[0];

  // return the step that comes next (step order is 1 based,
  // but orderedSteps array indices are 0 based)
  const nextStepOrder = Number(usersMostRecentStep.order) + 1;
  const nextStep = orderedSteps.find(s => s.order == nextStepOrder);

  if (!nextStep) return { content: project.finalMessage, order: Infinity };
  return nextStep;
}

function answeredSteps(nextUnansweredStep, project) {
  // return all the steps the came before the nextUnansweredStep;
  const orderedSteps =
    (project.steps && project.steps.sort(s => s.order).reverse()) || [];

  return orderedSteps.filter(s => s.order < nextUnansweredStep.order);
}

// prettier-ignore
function renderStepContent(content) {
  return (<div>
    <hr />
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>);
}

// prettier-ignore
function renderSteps(doc) {
  if (!doc.steps || doc.steps.length == 0) return <div />;

  const nextStep = nextUnansweredStep(doc);

  return (
    <div>
      <ul>
        {answeredSteps(nextStep, doc).map(s =>
          (<li key={s.order}>
            {renderStepContent(s.content)}
          </li>),
        )}
        <li>
          {renderStepContent(nextStep.content)}
        </li>
      </ul>
    </div>
  );
}

function ViewProject({ loading, doc, user, match }) {
  if (loading) return <Loading />;
  if (!doc) return <NotFound />;

  const userCanEdit =
    Roles.userIsInRole(user, ['admin']) || doc.createdBy == user._id;

  return (
    <div className="ViewProject">
      <div className="page-header clearfix">
        <h4 className="pull-left">
          {doc && doc.title}
        </h4>
        {userCanEdit
          ? <Link
            className="btn btn-success pull-right"
            to={`${match.url}/edit`}
          >
              Edit Project
            </Link>
          : <div />}
      </div>
      {doc.description}
      <ViewProjectAuthor author={doc.author} />
      {renderSteps(doc)}
    </div>
  );
}

ViewProject.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const idOrSlug = match.params._id;
  const subscription = Meteor.subscribe('projects.view', idOrSlug);
  const answersSubscription = Meteor.subscribe('users.projectAnswers');

  return {
    loading: !subscription.ready(),
    loadingAnswers: !answersSubscription.ready(),
    doc:
      Projects.findOne(idOrSlug) || Projects.findOne({ slug: idOrSlug }) || {},
    user: Meteor.user(),
    match,
  };
}, ViewProject);
