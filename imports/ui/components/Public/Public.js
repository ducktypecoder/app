import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import getParameterByName from '../../../api/Utility/get-parameter-by-name';

const Public = ({ loggingIn, authenticated, component, ...rest }) => {
  function render(props) {
    const { history } = props;

    if (loggingIn) return <div />;

    if (!authenticated) {
      return React.createElement(component, {
        ...props,
        loggingIn,
        authenticated
      });
    }

    const queryState = getParameterByName('state');
    const callbackUrl = getParameterByName('callbackUrl');

    if (!queryState || !callbackUrl) return <Redirect to="/documents" />;

    Meteor.call('users.getJwtAccessToken', async (err, token) => {
      const axios = await import('axios');

      // TODO: receive response from CLI client and handle any errors...
      axios.get(`${callbackUrl}?code=${token}&state=${queryState}`);

      history.push('/projects');
      Bert.alert('You are now logged in on the command line!', 'success');
    });

    return <Redirect to="/documents" />;
  }

  return <Route {...rest} render={render} />;
};
Public.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

export default Public;
