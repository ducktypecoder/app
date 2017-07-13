import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function ViewProjectAuthor({ author }) {
  if (!author) return <div />;

  // prettier-ignore
  return (
    <div>
      <h4>Author:</h4>
      <p>
        {author.name}
      </p>
      <p>
        <a href={`mailto:${author.email}`}>
          {author.email}
        </a>
      </p>
      <p>
        Bio: {author.bio}
      </p>
      { author.website ? <p>website: <a href={author.website}>{author.website}</a></p> : <div />}
      { author.companyName ? <p>Company: <a href={author.companyWebsite}>{author.companyName}</a></p> : <div />}
      { author.githubUrl ? <p>github: <a href={author.githubUrl}>{author.githubUrl}</a></p> : <div />}
      { author.twitter ? <p>twitter: <a href={`https://twitter.com/${author.twitter}`}>@{author.twitter}</a></p> : <div />}
      { author.facebook ? <p>facebook: <a href={author.facebook}>{author.facebook}</a></p> : <div />}
      { author.stackOverflow ? <p>stackOverflow: <a href={author.stackOverflow}>{author.stackOverflow}</a></p> : <div />}
      { author.linkedIn ? <p>linkedIn: <a href={author.linkedIn}>{author.linkedIn}</a></p> : <div />}
      { author.other ? <p>other: <a href={author.other}>{author.other}</a></p> : <div />}
    </div>
  );
}
