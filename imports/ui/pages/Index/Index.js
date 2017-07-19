import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Index.scss';

function Index() {
  return (
    <div className="Index">
      <img
        src="http://www.animatedimages.org/data/media/481/animated-duck-image-0065.gif"
        alt="little rubber ducky"
      />
      <div className="hero">
        <h1>ducktypecoder</h1>
        <p>
          Create real-world projects following well-written tutorials and
          step-by-step automated tests.
        </p>
      </div>
      <div className="content">
        <p>Complete a project on your own machine.</p>
        <p>
          Run the <code>ducktypecoder</code> command to test your progress and
          unlock the next step.
        </p>
        <p>
          <Link to="/projects">&rarr; Check out an example project.</Link>
        </p>
      </div>
    </div>
  );
}

export default Index;
