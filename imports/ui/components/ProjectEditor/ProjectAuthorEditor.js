/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';

class ProjectAuthorEditor extends React.Component {
  constructor(props) {
    super(props);

    const {
      name,
      email,
      website,
      bio,
      avatar,
      companyName,
      companyWebsite,
      githubUrl,
      twitter,
      facebook,
      stackOverflow,
      linkedIn,
      other,
    } = props.author;

    this.state = {
      name,
      email,
      website,
      bio,
      avatar,
      companyName,
      companyWebsite,
      githubUrl,
      twitter,
      facebook,
      stackOverflow,
      linkedIn,
      other,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const data = {
      name: this.name ? this.name.value : '',
      email: this.email ? this.email.value : '',
      website: this.website ? this.website.value : '',
      bio: this.bio ? this.bio.value : '',
      avatar: this.avatar ? this.avatar.value : '',
      companyName: this.companyName ? this.companyName.value : '',
      companyWebsite: this.companyWebsite ? this.companyWebsite.value : '',
      githubUrl: this.githubUrl ? this.githubUrl.value : '',
      twitter: this.twitter ? this.twitter.value : '',
      facebook: this.facebook ? this.facebook.value : '',
      stackOverflow: this.stackOverflow ? this.stackOverflow.value : '',
      linkedIn: this.linkedIn ? this.linkedIn.value : '',
      other: this.other ? this.other.value : '',
    };
    this.setState(data);
    this.props.updateAuthor(data);
  }

  render() {
    const author = this.props.author || {};

    return (
      <div>
        <FormGroup>
          <ControlLabel>Author Name</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="name"
            ref={name => (this.name = name)}
            value={this.state.name}
            placeholder="Author name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <input
            onChange={this.onChange}
            type="email"
            className="form-control"
            name="email"
            ref={email => (this.email = email)}
            value={this.state.email}
            placeholder="Author email"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Author bio</ControlLabel>
          <textarea
            onChange={this.onChange}
            className="form-control"
            name="bio"
            ref={bio => (this.bio = bio)}
            value={this.state.bio}
            placeholder="Author bio"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Avatar link</ControlLabel>
          <input
            type="text"
            onChange={this.onChange}
            className="form-control"
            name="avatar"
            ref={avatar => (this.avatar = avatar)}
            value={this.state.avatar}
            placeholder="Author avatar"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Author website</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="website"
            ref={website => (this.website = website)}
            value={this.state.website}
            placeholder="Author website"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Author github url</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="githubUrl"
            ref={githubUrl => (this.githubUrl = githubUrl)}
            value={this.state.githubUrl}
            placeholder="Author github url"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Twitter username</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="twitter"
            ref={twitter => (this.twitter = twitter)}
            value={this.state.twitter}
            placeholder="Author twitter"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>linkedIn URL</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="linkedIn"
            ref={linkedIn => (this.linkedIn = linkedIn)}
            value={this.state.linkedIn}
            placeholder="linkedIn URL"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>stackOverflow URL</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="stackOverflow"
            ref={stackOverflow => (this.stackOverflow = stackOverflow)}
            value={this.state.stackOverflow}
            placeholder="stackOverflow URL"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Facebook URL</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="facebook"
            ref={facebook => (this.facebook = facebook)}
            value={this.state.facebook}
            placeholder="Facebook URL"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Other URL</ControlLabel>
          <input
            onChange={this.onChange}
            type="text"
            className="form-control"
            name="other"
            ref={other => (this.other = other)}
            value={this.state.other}
            placeholder="any other helpful URL"
          />
        </FormGroup>
      </div>
    );
  }
}

ProjectAuthorEditor.defaultProps = {
  author: {
    name: '',
    email: '',
    website: '',
    bio: '',
    companyName: '',
    companyWebsite: '',
    githubUrl: '',
    twitter: '',
    facebook: '',
    stackOverflow: '',
    linkedIn: '',
    other: '',
  },
};

// ProjectAuthorEditor.propTypes = {
//   doc: PropTypes.object,
//
// };

export default ProjectAuthorEditor;
