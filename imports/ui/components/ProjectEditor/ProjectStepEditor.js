/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

const wrapperStyle = {};
const editorStyle = { border: '1px solid grey' };
const toolbarStyle = {};

class ProjectStepEditor extends React.Component {
  constructor(props) {
    super(props);

    let editorState;

    console.log('props.step: ', props.step);

    // https://github.com/facebook/draft-js/issues/284
    if (props.content) {
      const blocksFromHTML = convertFromHTML(props.content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // https://github.com/facebook/draft-js/issues/284
    const { content } = nextProps;

    const blocksFromHTML = convertFromHTML(content);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({ editorState });
  }

  onEditorStateChange(editorState) {
    const { step, updateStep, index } = this.props;

    this.setState({ editorState });
    updateStep(index, editorState.getCurrentContent().getPlainText());
  }

  handleRemove() {
    this.props.removeStep(this.props.step.id);
  }

  render() {
    const { step, addStep, removeStep, updateStep, index } = this.props;
    const { editorState } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default ProjectStepEditor;
