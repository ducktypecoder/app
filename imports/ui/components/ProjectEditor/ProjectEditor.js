/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import ProjectFinalMessageEditor from './ProjectFinalMessageEditor';

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.doc.title || '',
      description: props.doc.description || '',
      finalMessage:
        props.doc.finalMessage ||
        'A congratulatory message for the user on completing this tutorial...',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.updateFinalMessage = this.updateFinalMessage.bind(this);
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        // TODO: validate all author info
        title: {
          required: true,
        },
        description: {
          required: false,
        },
      },
      messages: {
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

  updateFinalMessage(finalMessage) {
    this.props.updateFinalMessage(finalMessage);
  }

  onTitleChange() {
    this.setState({ title: this.title.value });
    this.props.updateTitle(this.title.value.trim());
  }

  onDescriptionChange() {
    this.setState({ description: this.description.value });
    this.props.updateDescription(this.description.value.trim());
  }

  handleSubmit() {
    // no op, use 'save' button in side nav
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
            onChange={this.onTitleChange}
            ref={title => (this.title = title)}
            value={this.state.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Slug</ControlLabel>
          <input
            disabled
            type="text"
            className="form-control"
            name="slug"
            ref={slug => (this.slug = slug)}
            defaultValue={doc && doc.slug}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Project Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            onChange={this.onDescriptionChange}
            ref={description => (this.description = description)}
            value={this.state.description}
            placeholder="Tell what the user will learn as they work through this project..."
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Final message</ControlLabel>
          <ProjectFinalMessageEditor
            finalMessage={doc.finalMessage}
            updateFinalMessage={this.updateFinalMessage}
          />
        </FormGroup>
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
