import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Projects from '../../../api/Projects/Projects';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import NotFound from '../NotFound/NotFound';

const EditProject = ({ doc, history }) =>
  doc
    ? <div className="EditProject">
      <h4 className="page-header">{`Editing "${doc.title}"`}</h4>
      <ProjectEditor doc={doc} history={history} />
    </div>
    : <NotFound />;

EditProject.propTypes = {
  doc: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const projectId = match.params._id;
  const subscription = Meteor.subscribe('projects.view', projectId);

  return {
    loading: !subscription.ready(),
    doc: Projects.findOne(projectId),
  };
}, EditProject);
