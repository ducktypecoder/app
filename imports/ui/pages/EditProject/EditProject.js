import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Projects from '../../../api/Projects/Projects';
import ProjectEditorSideNav from '../../components/ProjectEditor/ProjectEditorSideNav';
import ProjectEditorActiveSection from '../../components/ProjectEditor/ProjectEditorActiveSection';
import NotFound from '../NotFound/NotFound';

class EditProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSidebarItem: 'general',
      title: props.doc.title || '',
      finalMessage: props.doc.finalMessage || '',
      description: props.doc.description || '',
      author: props.doc.author || {},
      steps: props.doc.steps || [],
    };

    this.updateProject = this.updateProject.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateFinalMessage = this.updateFinalMessage.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.publish = this.publish.bind(this);
    this.unpublish = this.unpublish.bind(this);
    this.addStep = this.addStep.bind(this);
    this.updateActiveSidebarItem = this.updateActiveSidebarItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { doc } = nextProps || {};

    if (doc.steps) this.setState({ steps: [...doc.steps] });
    if (doc.title) this.setState({ title: doc.title });
    if (doc.finalMessage) this.setState({ finalMessage: doc.finalMessage });
    if (doc.description) this.setState({ description: doc.description });
    if (doc.author) this.setState({ author: doc.author });
  }

  updateActiveSidebarItem(key) {
    this.setState({ activeSidebarItem: key });
  }

  updateProject() {
    const steps = this.state.steps.map((s, i) => ({
      content: s.content,
      tests: s.tests,
      order: i + 1,
    }));
    const { author, finalMessage, title, description } = this.state;
    const projectData = {
      _id: this.props.doc._id,
      steps,
      author,
      finalMessage,
      title,
      description,
    };

    Meteor.call('projects.update', projectData, (error, projectId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = 'Project updated!';
        Bert.alert(confirmation, 'success');
      }
    });
  }

  updateAuthor(authorInfo) {
    this.setState({ author: authorInfo });
  }

  updateFinalMessage(finalMessage) {
    this.setState({ finalMessage });
  }

  updateTitle(title) {
    this.setState({ title });
  }

  updateDescription(description) {
    this.setState({ description });
  }

  addStep() {
    const steps = [...this.state.steps];
    steps.push({ content: '', tests: '' });
    this.setState({
      steps,
      activeSidebarItem: `step-${steps.length}`,
    });
  }

  updateStep(index, content, tests) {
    const { steps } = this.state;
    const stepToUpdate = steps[index];

    if (content) stepToUpdate.content = content;
    if (tests) stepToUpdate.tests = tests;

    steps.splice(index, 1, stepToUpdate);

    this.setState({ steps });
  }

  removeStep(index) {
    if (!window.confirm('Are you sure you want to delete this step?')) return;

    const steps = [...this.state.steps];

    steps.splice(index, 1);
    this.setState({ steps, activeSidebarItem: 'general' });
  }

  publish() {
    const { doc } = this.props;

    Meteor.call('projects.publish', doc._id, (err, result) => {
      if (err) console.log(err);

      Bert.alert('Project published!', 'success');
    });
  }

  unpublish() {
    const { doc } = this.props;
    Meteor.call('projects.unpublish', doc._id, (err, result) => {
      if (err) console.log(err);

      Bert.alert('Project switched to draft!', 'success');
    });
  }

  render() {
    const { doc, history, user, loading } = this.props;
    const userProhibited =
      !Roles.userIsInRole(user, ['admin']) && doc.createdBy !== user._id;

    if (userProhibited) {
      return <h4>You are not authorized to edit this document.</h4>;
    }
    if (loading) return <div />;
    if (!doc) return <NotFound />;

    return (
      <div className="row">
        <div className="sidebar col-md-2">
          <h4 className="page-header"> &nbsp; </h4>
          <ProjectEditorSideNav
            activeSidebarItem={this.state.activeSidebarItem}
            addStep={this.addStep}
            doc={doc}
            history={history}
            steps={this.state.steps}
            updateActiveSidebarItem={this.updateActiveSidebarItem}
            updateProject={this.updateProject}
          />
        </div>
        <div className="EditProject col-md-10">
          <h4 className="page-header">
            {`Editing "${doc.title}"`}
          </h4>
          <ProjectEditorActiveSection
            activeSidebarItem={this.state.activeSidebarItem}
            addStep={this.addStep}
            author={doc.author}
            doc={doc}
            history={history}
            project={doc}
            publish={this.publish}
            removeStep={this.removeStep}
            steps={this.state.steps}
            toggleEditingStep={this.toggleEditingStep}
            unpublish={this.unpublish}
            updateFinalMessage={this.updateFinalMessage}
            updateTitle={this.updateTitle}
            updateDescription={this.updateDescription}
            updateProject={this.updateProject}
            updateAuthor={this.updateAuthor}
            user={user}
            updateStep={this.updateStep}
          />
        </div>
      </div>
    );
  }
}

EditProject.propTypes = {
  doc: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const idOrSlug = match.params._id;
  const subscription = Meteor.subscribe('projects.edit', idOrSlug);

  return {
    loading: !subscription.ready(),
    doc:
      Projects.findOne(idOrSlug) || Projects.findOne({ slug: idOrSlug }) || {},
    user: Meteor.user(),
    match,
  };
}, EditProject);
