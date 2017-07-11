/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const wrapperStyle = {};

const editorStyle = {
  border: '1px solid grey',
};

const toolbarStyle = {};

export default class ProjectStepInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: undefined };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  onEditorStateChange(editorState) {
    const { step, updateStep } = this.props;

    this.setState({ editorState });
    updateStep(step.id, editorState.getCurrentContent().getPlainText());
  }

  handleRemove() {
    this.props.removeStep(this.props.step.id);
  }

  handleToggle() {
    this.props.toggleEditingStep(this.props.index);
  }

  render() {
    const { toggleEditing, step, editing, index } = this.props;
    const { editorState } = this.state;

    if (editing || typeof editing === 'undefined') {
      return (
        <div data-test={`step-${index + 1}`}>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName={`editor-class${index}`}
            toolbarClassName="toolbar-class"
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}
            toolbarStyle={toolbarStyle}
          />

          <Button onClick={this.handleToggle}>Done</Button>
          <Button onClick={this.handleRemove}>Remove step</Button>
        </div>
      );
    }

    return (
      <div
        className="well"
        onClick={this.handleToggle}
        data-test={`step-${this.props.index + 1}`}
      >
        {step.content || 'foobar!!!'}
      </div>
    );
  }
}
//
// //
