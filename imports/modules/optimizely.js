import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import optimizely from 'optimizely-client-sdk';

// TODO: grab datafile from optimizely api:
// https://www.optimizelyapis.com/experiment/v1/projects/12345/json
// authenticate the call:
// https://developers.optimizely.com/classic/rest/getting-started/index.html

// TODO: use settings to hide api token, get as ENV variable
const API_TOKEN =
  'd6a2fe7b3cac448919167f6802da6810fcf9fd7e566413d6593fb27fd48d13f0:aQk2KnYxj';
const optimizelyProjectId = '8580354116';
const axiosClient = axios.create({
  baseURL: `https://www.optimizelyapis.com/experiment/v1/projects/${optimizelyProjectId}`,
  headers: { Token: API_TOKEN },
});

async function getDatafile() {
  const response = await axiosClient.get('/json');
  console.log('optimizely response: ', response);
  return response.data;
}

async function getOptimizelyClientInstance() {
  const datafile = await getDatafile();

  return optimizely.createInstance({
    datafile,
  });
}

async function setupExperiments() {
  const userId = Meteor.userId();
  const optimizelyClientInstance = await getOptimizelyClientInstance();
  const variation = optimizelyClientInstance.activate(
    'landing_page_headline',
    userId,
  );
  const headlineEl = document.getElementById('landing_page_headline');

  console.log({ variation });

  switch (variation) {
    case '1':
      headlineEl.textContent =
        'The best tool for creating and following software development tutorials';
      break;
    case '2':
      headlineEl.textContent =
        'Create and study real-world web development projects.';
      break;
    case '3':
      headlineEl.textContent =
        'The greatest tool for authoring web development tutorials and workshops.';
      break;
    case '4':
      headlineEl.textContent =
        'Create awesome, follow-along web development projects and tutorials.';
      break;
    default:
  }

  // Track conversion event
  // optimizelyClientInstance.track('my_conversion', userId);
}

export default {
  setupExperiments,
};
