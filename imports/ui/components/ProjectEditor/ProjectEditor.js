/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ProjectEditor extends React.Component {
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
