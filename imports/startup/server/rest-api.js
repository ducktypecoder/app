import { Meteor } from 'meteor/meteor';
import express from 'express';
import bodyParser from 'body-parser';

import checkAnswer from '../../api/Projects/server/check-answer';
import getCurrentStep from '../../api/Projects/server/get-current-step';
import publishProject from '../../api/Projects/server/publish-project';

export default function setupApi() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/api/', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' });
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

  app.post('/api/publish', async (req, res) => {
    try {
      const repo = req.body.repo;
      const content = req.body.content;
      const result = await publishProject(repo, content);

      return res.status(201).json(result);
    } catch (e) {
      return res.status(400).json({ error: e.message, success: false });
    }

    console.log('Attempting to publish repo: ', repo);
    return res.status(201).json({ success: true });
  });

  WebApp.connectHandlers.use(app); // eslint-disable-line
}
