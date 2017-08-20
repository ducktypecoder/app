import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import '../../ui/stylesheets/app.scss';
import optimizely from '../../modules/optimizely';

Meteor.startup(async () => {
  render(<App />, document.getElementById('react-root'));
  optimizely.setupExperiments();
});
