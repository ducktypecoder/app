import { Meteor } from 'meteor/meteor';
import express from 'express';
import bodyParser from 'body-parser';

import checkAnswer from '../../api/Projects/server/check-answer';
import getCurrentStep from '../../api/Projects/server/get-current-step';

export default function setupApi() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/api/', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' });
  });

  // When the user's client submits an answer,
  // if it is a correct answer, then record the user's answea
  // and respond 'correct: true'
  // if it is incorrect, then respond 'correct: false'
  app.post('/api/answers', async (req, res) => {
    const data = {
      token: req.body.token,
      project: req.body.project,
      step: req.body.step,
      answer: req.body.answer,
    };

    const checkAnswerResult = checkAnswer(data);

    return res.status(200).json({ ...checkAnswerResult });
  });

  app.get('/api/current-step', (req, res) => {
    const data = {
      token: req.query.token, // TODO: send and recieve token in the req headers
      projectSlug: req.query.project,
    };

    try {
      const currentStep = getCurrentStep(data);
      return res.status(200).json(currentStep);
    } catch (e) {
      return res.status(400).json({ error: e.message, success: false });
    }
  });

  WebApp.connectHandlers.use(app); // eslint-disable-line
}
