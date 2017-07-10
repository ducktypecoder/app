/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

import ProjectStepInput from './ProjectStepInput.js';

class ProjectStepsEditor extends React.Component {
  render() {
    const {
      steps,
      addStep,
      removeStep,
      updateStep,
      toggleEditingStep,
    } = this.props;
    const isEditing = false; // toggle editor

    return (
      <div>
        {steps &&
          steps.map((s, i) =>
            (<ProjectStepInput
              toggleEditingStep={toggleEditingStep}
              key={i}
              step={s}
              editing={s.editing}
              index={i}
              removeStep={removeStep}
              updateStep={updateStep}
            />),
          )}
        <Button data-test="addStep" onClick={addStep}>
          Add step
        </Button>
      </div>
    );
  }
}

export default ProjectStepsEditor;
