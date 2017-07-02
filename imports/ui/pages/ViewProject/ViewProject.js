import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Projects from '../../../api/Projects/Projects';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

function nextUnansweredStep(project) {
  if (!project) return {};

  // get all the project steps, in order, and check on the user
  const orderedSteps = project.steps.sort(s => s.order).reverse();
  const user = Meteor.user();

  if (!user) return orderedSteps[0];
  if (!user.projects) return orderedSteps[0];

  // get the answers that the user has submitted for this project
  const userProjectRecord = user.projects.filter(p => p._id == project._id)[0];
  const userAnswers = userProjectRecord.answers;

  // in the user's answers, get the highest ordered step that has been answered
  const step = userAnswers.sort(s => s.order).reverse()[0];

  // return the step that comes next (step order is 1 based,
  // but orderedSteps array indices are 0 based)
  return orderedSteps[step.order];
}

function answeredSteps(nextUnansweredStep, project) {
  // return all the steps the came before the nextUnansweredStep;
  const orderedSteps = project.steps.sort(s => s.order).reverse();
  return orderedSteps.filter(s => s.order < nextUnansweredStep.order);
}

const renderSteps = (doc) => {
  const step = nextUnansweredStep(doc);

  return (
    <div>
      <ul>
        {answeredSteps(step, doc).map(s =>
          (<li key={s.order}>
            {s.content}
          </li>),
        )}
        <li>
          {step.content}
        </li>
      </ul>
    </div>
  );
};

const ViewProject = ({ loading, doc }) => {
  if (loading) return <Loading />;
  if (!doc) return <NotFound />;

  return (
    <div className="ViewProject">
      <div className="page-header clearfix">
        <h4 className="pull-left">
          {doc && doc.title}
        </h4>
      </div>
      {doc.description}
      {renderSteps(doc)}
    </div>
  );
};

ViewProject.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const projectId = match.params._id;
  const subscription = Meteor.subscribe('projects.view', projectId);
  const answersSubscription = Meteor.subscribe('users.projectAnswers');

  return {
    loading: !subscription.ready(),
    loadingAnswers: !answersSubscription.ready(),
    doc: Projects.findOne(projectId) || {},
  };
}, ViewProject);
