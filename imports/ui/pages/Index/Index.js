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
          Practical software development tutorials guided by helpful automated
          tests.
        </p>
      </div>
      <div className="main-action">
        <Link to="/projects/hello-world" className="btn btn-success btn-lg">
          &rarr; See an example project
        </Link>
      </div>
    </div>
  );
}

export default Index;
