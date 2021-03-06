import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import Projects from '../../api/Projects/Projects';

import checkAnswer from '../../api/Projects/server/check-answer';
import getCurrentStep from '../../api/Projects/server/get-current-step';
import publishProject from '../../api/Projects/server/publish-project';
import getJwtSecretKey from '../../api/Users/server/get-jwt-secret-key';

function authenticate(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: 'You must be logged in to publish a project',
      success: false,
    });
  }

  return next();
}

export default function setupApi() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    Meteor.bindEnvironment(async (req, res, next) => {
      const authToken = req.get('Authorization');

      if (!authToken) return next();

      const decoded = jwt.verify(authToken, getJwtSecretKey);
      const email = decoded.user.email;

      req.user = await Accounts.findUserByEmail(email);

      return next();
    }),
  );

  app.get('/api/project-repo', async (req, res) => {
    const slug = req.query.slug;
    const project = await Projects.rawCollection().findOne({ slug });

    if (!project) {
      res.status(204).json({
        success: false,
        error: `Sorry, we could not find a project with that info (${slug}).`,
      });
    }

    res.status(200).json({ success: true, repo: project.githubUrl });
  });

  // When the user's client submits an answer,
  // if it is a correct answer, then record the user's answea
  // and respond 'correct: true'
  // if it is incorrect, then respond 'correct: false'
  app.post('/api/answers', async (req, res) => {
    console.log('POST /api/answers');
    console.log('req/body: ', req.body);
    const data = {
      token: req.body.token,
      project: req.body.project,
      step: req.body.step,
      answer: req.body.answer,
    };

    console.log({ data });

    const checkAnswerResult = checkAnswer(data);

    return res.status(200).json({ ...checkAnswerResult });
  });

  app.get('/api/current-step', (req, res) => {
    console.log('GET /api/current-step');
    const data = {
      token: req.query.token, // TODO: send and recieve token in the req headers
      projectSlug: req.query.project,
    };

    console.log('request data: ', data);

    try {
      const currentStep = getCurrentStep(data);
      return res.status(200).json(currentStep);
    } catch (e) {
      return res.status(400).json({ error: e.message, success: false });
    }
  });

  app.post('/api/publish', authenticate, async (req, res) => {
    try {
      const repo = req.body.repo;
      const content = req.body.content;
      const user = req.user;
      const result = await publishProject(repo, content, user);

      return res.status(201).json(result);
    } catch (e) {
      return res.status(400).json({ error: e.message, success: false });
    }

    console.log('Attempting to publish repo: ', repo);
    return res.status(201).json({ success: true });
  });

  WebApp.connectHandlers.use(app); // eslint-disable-line
}
