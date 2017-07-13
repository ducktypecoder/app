/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const wrapperStyle = {};
const editorStyle = { border: '1px solid grey' };
const toolbarStyle = {};

class ProjectStepEditor extends React.Component {
  constructor(props) {
    super(props);

    let editorState;
    // https://github.com/facebook/draft-js/issues/284
    if (props.finalMessage) {
      const blocksFromHTML = convertFromHTML(props.finalMessage);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  // receive changes from parent
  componentWillReceiveProps(nextProps) {
    // if we are getting the same step, do not mess with editor state
    if (nextProps.index === this.props.index) return;

    // when we get a new step, update the editor state with the new step's content
    // https://github.com/facebook/draft-js/issues/284
    const { finalMessage } = nextProps;
    const blocksFromHTML = convertFromHTML(finalMessage);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({ editorState });
  }

  onEditorStateChange(editorState) {
    const { updateFinalMessage } = this.props;
    const finalMessage = convertToHTML(editorState.getCurrentContent());

    this.setState({ editorState });
    updateFinalMessage(finalMessage);
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
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

export default ProjectStepEditor;
