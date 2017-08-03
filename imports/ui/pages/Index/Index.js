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
        <p>
          Simple platform for authoring and following software development
          tutorials
        </p>
      </div>
      <p>First, install the ducktypecoder package</p>
      <p>
        <code>$ npm i -g ducktypecoder</code>
      </p>
      <p>Second, start a tutorial</p>
      <p>
        <code>
          $ ducktypecoder start https://github.com/ducktypecoder/hello-world
        </code>
      </p>
      <p>Follow the instructions. Run ducktypecoder for the next step:</p>
      <p>
        <code>$ ducktypecoder next</code>
      </p>
      <div className="main-action">
        <Link to="/projects/hello-world" className="btn btn-success btn-lg">
          &rarr; See an example project
        </Link>
      </div>
    </div>
  );
}

export default Index;
