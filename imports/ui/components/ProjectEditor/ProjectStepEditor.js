/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
// Note: this CodeMirror package has a bug (value not updating when state changes),
// so in package.json we install a forked version.
// Read about it here: https://github.com/JedWatson/react-codemirror/issues/106#issuecomment-301675526
// In future, we might want to follow advice in that thread and produce our own thin wrapper
// around the codemirror source code.
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import Editor from '../Editor/Editor';

class ProjectStepEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: props.tests ? props.tests : '// TODO: tests for this step...',
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.onTestsChange = this.onTestsChange.bind(this);
  }

  // receive changes from parent
  componentWillReceiveProps(nextProps) {
    // if we are getting the same step, do not mess with editor state
    if (nextProps.index === this.props.index) return;

    // when we get a new step, update the editor state with the new step's content
    // https://github.com/facebook/draft-js/issues/284
    const { content, tests } = nextProps;
    this.setState({
      tests: tests || '// TODO: write tests for this step',
    });
  }

  handleRemove() {
    this.props.removeStep(this.props.index);
  }

  updateContent(content) {
    const { index, updateStep } = this.props;
    const { tests } = this.state;

    updateStep(index, content, tests);
  }

  onTestsChange(newTests) {
    const { index, updateStep } = this.props;

    this.setState({ tests: newTests });
    updateStep(index, false, newTests);
  }

  render() {
    const { content, updateStep, index } = this.props;
    const { tests } = this.state;
    const codeMirrorOptions = {
      lineNumbers: true,
      mode: 'javascript',
    };

    return (
      <div>
        <Editor key={index} content={content} onChange={this.updateContent} />
        <br />
        <hr />
        <h4>Tests: </h4>
        <CodeMirror
          value={tests}
          onChange={this.onTestsChange}
          options={codeMirrorOptions}
        />

        <Button bsSize="xs" onClick={this.handleRemove}>
          remove step
        </Button>
      </div>
    );
  }
}

ProjectStepEditor.propTypes = {
  step: PropTypes.object.isRequired,
  tests: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default ProjectStepEditor;
