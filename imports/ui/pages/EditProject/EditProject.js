import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Nav, NavItem } from 'react-bootstrap';
import Projects from '../../../api/Projects/Projects';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import ProjectAuthorEditor from '../../components/ProjectEditor/ProjectAuthorEditor';
import ProjectSettingsEditor from '../../components/ProjectEditor/ProjectSettingsEditor';
import ProjectStepEditor from '../../components/ProjectEditor/ProjectStepEditor';
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

    this.sideNav = this.sideNav.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateFinalMessage = this.updateFinalMessage.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.publish = this.publish.bind(this);
    this.unpublish = this.unpublish.bind(this);
    this.handleSectionSelect = this.handleSectionSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { doc } = nextProps || {};

    if (doc.steps) this.setState({ steps: [...doc.steps] });
    if (doc.title) this.setState({ title: doc.title });
    if (doc.finalMessage) this.setState({ finalMessage: doc.finalMessage });
    if (doc.description) this.setState({ description: doc.description });
    if (doc.author) this.setState({ author: doc.author });
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

    console.log({ projectData });

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

  updateStep(index, content, tests) {
    const { steps } = this.state;
    const stepToUpdate = steps[index];

    if (content) stepToUpdate.content = content;
    if (tests) stepToUpdate.tests = tests;

    steps.splice(index, 1, stepToUpdate);

    this.setState({ steps });
  }

  removeStep(id) {
    if (!window.confirm('Are you sure you want to delete this step?')) return;

    const steps = [...this.state.steps];
    const stepIndex = steps.findIndex(s => s.id === id);

    steps.splice(stepIndex, 1);
    this.setState({ steps });
  }

  publish() {
    const { doc } = this.props;
    console.log('publish!');
    Meteor.call('projects.publish', doc._id, (err, result) => {
      if (err) console.log(err);

      Bert.alert('Project published!', 'success');
    });
  }

  unpublish() {
    const { doc } = this.props;
    console.log('unpublish!');
    Meteor.call('projects.unpublish', doc._id, (err, result) => {
      if (err) console.log(err);

      Bert.alert('Project switched to draft!', 'success');
    });
  }

  // Handle each time a side nav link is clicked
  handleSectionSelect(key) {
    const { doc } = this.props;
    const data = {
      _id: doc._id,
      title: doc.title,
      author: doc.author,
      description: doc.description,
      finalMessage: doc.finalMessage,
      steps: doc.steps,
    };
    switch (key) {
      case 'addStep':
        const steps = [...this.state.steps];
        steps.push({ content: '', tests: '' });
        this.setState({
          steps,
          activeSidebarItem: `step-${steps.length}`,
        });
        return;
      case 'general':
        this.setState({ activeSidebarItem: 'general' });
        return;
      case 'settings':
        this.setState({ activeSidebarItem: 'settings' });
        return;
      case 'view':
        this.updateProject(data);
        this.props.history.push(`/projects/${data._id}`);
        return;
      case 'save':
        this.updateProject(data);
        return;
      default:
        this.setState({ activeSidebarItem: key });
        this.forceUpdate();
    }
  }

  // Side nav for choosing which section to make active
  sideNav() {
    const { steps, activeSidebarItem } = this.state;

    return (
      <Nav
        bsStyle="pills"
        stacked
        activeKey={activeSidebarItem}
        onSelect={this.handleSectionSelect}
      >
        <NavItem eventKey="general"> General </NavItem>
        <NavItem eventKey="author"> Author </NavItem>
        <NavItem eventKey="settings"> Settings </NavItem>
        {steps.map((s, i) =>
          (<NavItem key={i} eventKey={`step-${i + 1}`}>
            Step {i + 1}
          </NavItem>),
        )}
        <NavItem eventKey="addStep"> + Add Step </NavItem>
        <NavItem eventKey="view"> Save & View &rarr; </NavItem>
        <NavItem eventKey="save"> Save </NavItem>
      </Nav>
    );
  }

  // The actual section to be rendered for editing
  activeSection() {
    const { doc, user, history } = this.props;
    const { activeSidebarItem, steps } = this.state;

    if (activeSidebarItem === 'general') {
      return (
        <ProjectEditor
          doc={doc}
          history={history}
          updateFinalMessage={this.updateFinalMessage}
          updateTitle={this.updateTitle}
          updateDescription={this.updateDescription}
          updateProject={this.updateProject}
        />
      );
    }

    if (activeSidebarItem === 'author') {
      return (
        <ProjectAuthorEditor
          author={doc.author}
          updateAuthor={this.updateAuthor}
        />
      );
    }

    if (activeSidebarItem === 'settings') {
      return (
        <ProjectSettingsEditor
          doc={doc}
          user={user}
          publish={this.publish}
          unpublish={this.unpublish}
        />
      );
    }

    const stepIndex = Number(activeSidebarItem.replace('step-', '')) - 1;
    const step = steps[stepIndex];

    return (
      <ProjectStepEditor
        step={step}
        content={step.content}
        tests={step.tests}
        index={stepIndex}
        addStep={this.addStep}
        removeStep={this.removeStep}
        updateStep={this.updateStep}
        toggleEditingStep={this.toggleEditingStep}
        project={doc}
      />
    );
  }

  render() {
    const { doc, user, loading } = this.props;
    const { steps, activeSidebarItem } = this.state;

    const userProhibited =
      !Roles.userIsInRole(user, ['admin']) && doc.createdBy !== user._id;

    if (loading) return <div />;

    if (!doc) return <NotFound />;

    if (userProhibited) {
      return <h4>You are not authorized to edit this document.</h4>;
    }

    return (
      <div className="row">
        <div className="sidebar col-md-2">
          <h4 className="page-header"> &nbsp; </h4> {this.sideNav()}
        </div>
        <div className="EditProject col-md-10">
          <h4 className="page-header">
            {`Editing "${doc.title}"`}
          </h4>
          {this.activeSection()}
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
  const projectId = match.params._id;
  const subscription = Meteor.subscribe('projects.edit', projectId);

  return {
    loading: !subscription.ready(),
    doc: Projects.findOne(projectId) || {},
    user: Meteor.user(),
    match,
  };
}, EditProject);
