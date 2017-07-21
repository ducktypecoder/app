/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Editor from '../Editor/Editor';

class ProjectFinalMessageEditor extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange(content) {
    this.props.updateFinalMessage(content);
  }

  render() {
    return (
      <Editor content={this.props.finalMessage} onChange={this.onChange} />
    );
  }
}

export default ProjectFinalMessageEditor;
