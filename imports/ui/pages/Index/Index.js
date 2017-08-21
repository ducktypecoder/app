import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Index.scss';

function Index() {
  return (
    <div className="Index">
      <div className="hero">
        <h1>ducktypecoder</h1>
        <img
          src="http://www.animatedimages.org/data/media/481/animated-duck-image-0065.gif"
          alt="little rubber ducky"
        />
        <p id="landing_page_headline">
          Simple platform for authoring and following software development
          tutorials
        </p>
      </div>
      <hr />
      <p>Install the ducktypecoder package:</p>
      <p>
        <kbd>$ npm i -g ducktypecoder</kbd>
      </p>
      <p>Start a tutorial:</p>
      <p>
        <kbd>$ ducktypecoder start hello-world</kbd>
      </p>
      <p>Follow the instructions and go to the next step:</p>
      <p>
        <kbd>$ ducktypecoder next</kbd>
      </p>

      <div className="main-action-container">
        <div className="main-action">
          <Link to="/docs" className="btn btn-success btn-lg btn-CTA">
            &rarr; Read the docs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
