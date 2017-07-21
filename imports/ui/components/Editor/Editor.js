import React from 'react';
import PropTypes from 'prop-types';
import './redactor/redactor.min.js';
import './redactor/plugins/source.js';
import './redactor/redactor.css';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.initializeRedactor = this.initializeRedactor.bind(this);
  }

  componentDidMount() {
    this.initializeRedactor();
  }

  initializeRedactor() {
    const { content, onChange } = this.props;
    const stringContent = `${content}`;

    window.$('#content').redactor({
      callbacks: {
        init() {
          this.code.set(stringContent);
        },
        change() {
          onChange(this.code.get());
        },
      },
    });
  }

  render() {
    return <textarea id="content" name="content" />;
  }
}

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
