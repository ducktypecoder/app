import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';

class NewProject extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const title = this.title.value;

    Meteor.call('projects.create', title, (err, projectId) => {
      if (err) console.log(err);

      this.props.history.push(`/projects/${projectId}/edit`);
    });
  }

  render() {
    return (
      <div className="NewProject">
        <h4 className="page-header">New Project</h4>
        <form ref={form => (this.form = form)} onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="title"
              ref={title => (this.title = title)}
              placeholder="Project title goes here..."
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">
            Create Project
          </Button>
        </form>
      </div>
    );
  }
}

NewProject.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewProject;
