import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import getParameterByName from '../../../api/Utility/get-parameter-by-name';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleSubmit() {
    const { history } = this.props;

    async function handleCommandLineCallback(queryState, callbackUrl) {
      // NOTE: const token = await Meteor.call(...) <-- broken.
      Meteor.call('users.getJwtAccessToken', async (err, token) => {
        const axios = await import('axios');

        // TODO: receive response from CLI client and handle any errors...
        axios.get(`${callbackUrl}?code=${token}&state=${queryState}`);

        Bert.alert('You are now logged in on the command line!', 'success');
        history.push('/projects');
      });
    }

    Meteor.loginWithPassword(
      this.emailAddress.value,
      this.password.value,
      error => {
        if (error) return Bert.alert(error.reason, 'danger');

        // if we are logging in from the CLI,the request query will have 'state' and 'callbackUrl'
        // send back to the callbackUrl, the same 'state' and also the user tokens and redirect to 'great you can go back to the CLI now!'
        const queryState = getParameterByName('state');
        const callbackUrl = getParameterByName('callbackUrl');

        if (queryState && callbackUrl) {
          handleCommandLineCallback(queryState, callbackUrl);
        } else {
          Bert.alert('Welcome back!', 'success');
          history.push('/projects');
        }
      }
    );
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header">Log In</h4>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['github']}
                  emailMessage={{
                    offset: 100,
                    text: 'Log In with an Email Address'
                  }}
                />
              </Col>
            </Row>
            <form
              ref={form => (this.form = form)}
              onSubmit={event => event.preventDefault()}
            >
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  ref={emailAddress => (this.emailAddress = emailAddress)}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="clearfix">
                  <span className="pull-left">Password</span>
                  <Link className="pull-right" to="/recover-password">
                    Forgot password?
                  </Link>
                </ControlLabel>
                <input
                  type="password"
                  name="password"
                  ref={password => (this.password = password)}
                  className="form-control"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">
                Log In
              </Button>
              <AccountPageFooter>
                <p>
                  {"Don't have an account?"} <Link to="/signup">Sign Up</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default Login;
