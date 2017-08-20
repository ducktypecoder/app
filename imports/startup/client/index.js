import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import '../../ui/stylesheets/app.scss';

Meteor.startup(async () => {
  render(<App />, document.getElementById('react-root'));

  const optimizelyImport = await import('../../modules/optimizely');
  const optimizely = optimizelyImport.default;

  optimizely.setupExperiments();
});
