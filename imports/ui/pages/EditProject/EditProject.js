import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Nav, NavItem } from 'react-bootstrap';
import Projects from '../../../api/Projects/Projects';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import ProjectStepEditor from '../../components/ProjectEditor/ProjectStepEditor';
import NotFound from '../NotFound/NotFound';

class EditProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      activeSidebarItem: 'general',
    };

    this.removeStep = this.removeStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.handleSectionSelect = this.handleSectionSelect.bind(this);
  }

  removeStep(id) {
    if (!window.confirm('Are you sure you want to delete this step?')) return;
    const steps = [...this.state.steps];
    const stepIndex = steps.findIndex(s => s.id === id);
    console.log({ stepIndex });
    steps.splice(stepIndex, 1);
    this.setState({ steps });
  }

  updateStep(index, content) {
    const { steps } = this.state;
    const stepToUpdate = steps[index];
    stepToUpdate.content = content;
    steps.splice(index, 1, stepToUpdate);
    this.setState({ steps });
  }

  handleSectionSelect(key) {
    switch (key) {
      case 'addStep':
        const steps = [...this.state.steps];
        steps.push({ content: '' });
        this.setState({
          steps,
          activeSidebarItem: `step-${steps.length}`,
        });
        return;
      case 'general':
        this.setState({ activeSidebarItem: 'general' });
        return;
      default:
        this.setState({ activeSidebarItem: key });
    }
  }

  sideNav() {
    const { steps, activeSidebarItem } = this.state;
    return (
      <Nav
        bsStyle="pills"
        stacked
        activeKey={activeSidebarItem}
        onSelect={this.handleSectionSelect}
      >
        <NavItem eventKey="general">General</NavItem>
        {steps.map((s, i) =>
          (<NavItem key={i} eventKey={`step-${i + 1}`}>
            Step {i + 1}
          </NavItem>),
        )}
        <NavItem eventKey="addStep">+ Add Step</NavItem>
      </Nav>
    );
  }

  activeSection() {
    const { doc, history } = this.props;
    const { activeSidebarItem, steps } = this.state;

    if (activeSidebarItem === 'general') {
      return <ProjectEditor doc={doc} history={history} />;
    }

    const stepIndex = Number(activeSidebarItem.replace('step-', '')) - 1;
    const step = steps[stepIndex];

    return (
      <ProjectStepEditor
        step={step}
        content={step.content}
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
    const { doc, loading } = this.props;

    if (loading) return <div />;
    if (!doc) return <NotFound />;

    return (
      <div className="row">
        <div className="sidebar col-md-2">
          <h4 className="page-header">&nbsp;</h4>
          {this.sideNav()}
        </div>
        <div className="EditProject col-md-10">
          <h4 className="page-header">{`Editing "${doc.title}"`}</h4>
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
  const subscription = Meteor.subscribe('projects.view', projectId);

  return {
    loading: !subscription.ready(),
    doc: Projects.findOne(projectId),
  };
}, EditProject);
