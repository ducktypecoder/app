/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Note: this CodeMirror package has a bug (value not updating when state changes),
// so in package.json we install a forked version.
// Read about it here: https://github.com/JedWatson/react-codemirror/issues/106#issuecomment-301675526
// In future, we might want to follow advice in that thread and produce our own thin wrapper
// around the codemirror source code.
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

const wrapperStyle = {};
const editorStyle = { border: '1px solid grey' };
const toolbarStyle = {};

class ProjectStepEditor extends React.Component {
  constructor(props) {
    super(props);

    let editorState;
    // https://github.com/facebook/draft-js/issues/284
    if (props.content) {
      const blocksFromHTML = convertFromHTML(props.content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    const tests = props.tests ? props.tests : '// TODO: tests for this step...';

    this.state = {
      editorState,
      tests,
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onTestsChange = this.onTestsChange.bind(this);
  }

  // receive changes from parent
  componentWillReceiveProps(nextProps) {
    // if we are getting the same step, do not mess with editor state
    if (nextProps.index === this.props.index) return;

    // when we get a new step, update the editor state with the new step's content
    // https://github.com/facebook/draft-js/issues/284
    const { content, tests } = nextProps;
    const blocksFromHTML = convertFromHTML(content);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState,
      tests: tests || '// TODO: write tests for this step',
    });
  }

  onEditorStateChange(editorState) {
    const { step, updateStep, index } = this.props;
    const content = convertToHTML(editorState.getCurrentContent());

    this.setState({ editorState });
    updateStep(index, content);
  }

  onTestsChange(newTests) {
    const { index, updateStep } = this.props;

    this.setState({ tests: newTests });
    updateStep(index, false, newTests);
  }

  handleRemove() {
    this.props.removeStep(this.props.step.id);
  }

  render() {
    const { step, addStep, removeStep, updateStep, index } = this.props;
    const { editorState, tests } = this.state;
    const codeMirrorOptions = {
      lineNumbers: true,
      mode: 'javascript',
    };

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

        {/*
          TODO: codemirror value not changing when selecting between different steps in the EditProject nav
           */}
        <CodeMirror
          value={tests}
          onChange={this.onTestsChange}
          options={codeMirrorOptions}
        />
      </div>
    );
  }
}

export default ProjectStepEditor;
