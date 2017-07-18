import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class ProjectSettingsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.handleUnpublishClick = this.handleUnpublishClick.bind(this);
  }

  handlePublishClick(e) {
    this.props.publish();
  }

  handleUnpublishClick(e) {
    this.props.unpublish();
  }

  render() {
    const { doc, user } = this.props;
    const userIsAdmin = Roles.userIsInRole(user, ['admin']);

    return (
      <div>
        {userIsAdmin
          ? <div>
            {doc.draft
                ? <Button onClick={this.handlePublishClick}>Publish</Button>
                : <Button onClick={this.handleUnpublishClick}>
                    Unpublish
                  </Button>}
          </div>
          : <div />}
      </div>
    );
  }
}
