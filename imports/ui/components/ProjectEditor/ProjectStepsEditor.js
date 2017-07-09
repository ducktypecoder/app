/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

const wrapperStyle = {
  color: 'blue',
};

const editorStyle = {
  border: '1px solid red',
};

const toolbarStyle = {
  color: 'green',
};

class ProjectStepsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        wrapperStyle={wrapperStyle}
        editorStyle={editorStyle}
        toolbarStyle={toolbarStyle}
      />
    );
  }
}

export default ProjectStepsEditor;
