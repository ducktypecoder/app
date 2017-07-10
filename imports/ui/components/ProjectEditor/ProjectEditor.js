/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import ProjectStepsEditor from './ProjectStepsEditor';

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);

    const steps = (props.doc && props.doc.steps) || [];
    const stepsPresent = steps.length > 0;
    const sortedSteps = stepsPresent && steps.sort(s => s.order);
    const sortedAndMappedSteps = sortedSteps && sortedSteps.map(s => s.content);

    this.state = {
      steps: stepsPresent ? sortedAndMappedSteps : [],
    };

    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.toggleEditingStep = this.toggleEditingStep.bind(this);
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        author: {
          required: true,
        },
        title: {
          required: true,
        },
        description: {
          required: false,
        },
        finalMessage: {
          required: false,
        },
      },
      messages: {
        author: {
          required: "Tell us the author's name",
        },
        title: {
          required: 'Need a title in here, Seuss.',
        },
        description: {
          required: 'This needs a description, please.',
        },
      },
      submitHandler() {
        component.handleSubmit();
      },
    });
  }

  toggleEditingStep(index) {
    const toggledSteps = this.state.steps.map(s => ({
      content: s.content,
      editing: false,
    }));
    toggledSteps.splice(
      index,
      1,
      Object.assign(toggledSteps[index], { editing: true }),
    );
    this.setState({ steps: [...toggledSteps] });
  }

  addStep() {
    const toggledSteps = this.state.steps.map(s => ({
      content: s.content,
      editing: false,
    }));
    const newStep = { content: '', editing: true };

    this.setState({ steps: [...toggledSteps, newStep] });
  }

  removeStep(index) {
    // if (!window.confirm('Are you sure you want to delete this step?')) return;

    const steps = this.state.steps;
    console.log({ index });
    console.log({ stepsBeforeSplice: steps.map(s => s.content).join(', ') });
    steps.splice(index, 1);
    console.log({ stepsAfterSplice: steps.map(s => s.content).join(', ') });
    this.setState({ steps });
    console.log({
      stepsInState: this.state.steps.map(s => s.content).join(', '),
    });
  }

  updateStep(index, content) {
    const { steps } = this.state;
    steps.splice(index, 1, { content });
    this.setState({ steps });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingProject = this.props.doc && this.props.doc._id;
    const methodToCall = existingProject
      ? 'projects.update'
      : 'projects.insert';
    const doc = {
      title: this.title.value.trim(),
      author: this.author.value.trim(),
      finalMesasage: this.finalMesasage.value.trim(),
      description: this.description.value.trim(),
    };

    if (existingProject) doc._id = existingProject;

    Meteor.call(methodToCall, doc, (error, projectId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingProject
          ? 'Project updated!'
          : 'Project added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/projects/${projectId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (
      <form
        ref={form => (this.form = form)}
        onSubmit={event => event.preventDefault()}
      >
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            ref={title => (this.title = title)}
            defaultValue={doc && doc.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Author</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="author"
            ref={author => (this.author = author)}
            defaultValue={doc && doc.author}
            placeholder="The author's name..."
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            ref={description => (this.description = description)}
            defaultValue={doc && doc.description}
            placeholder="Tell what the user will learn as they work through this project..."
          />
        </FormGroup>
        <ProjectStepsEditor
          steps={this.state.steps}
          addStep={this.addStep}
          removeStep={this.removeStep}
          updateStep={this.updateStep}
          toggleEditingStep={this.toggleEditingStep}
          project={doc}
        />
        <FormGroup>
          <ControlLabel>Final message</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            ref={message => (this.message = message)}
            defaultValue={doc && doc.message}
            placeholder="Some message congratulating the user for finishing the project..."
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {doc && doc._id ? 'Save Changes' : 'Add Project'}
        </Button>
      </form>
    );
  }
}

ProjectEditor.defaultProps = {
  doc: { title: '', description: '' },
};

ProjectEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ProjectEditor;
