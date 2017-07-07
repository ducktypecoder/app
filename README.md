# ducktypecoder

If you don't already have meteor installed, then install it.

## Developing with the ducktypecoder npm package

You will want to clone that package and use 'npm link' to run it in a local practice project.

Follow these instructions.

- clone the [npm package](https://github.com/ducktypecoder/npm-package)
- within the npm package directory, run 2 commands:
  - npm install
  - npm link
- and within a practice project directory (ie: a 'hello-world' project) run this command:
  - npm link ducktypecoder

Now, say you are in '/hello-world', it will seem as if the 'ducktypecoder' package has been downloaded into the '/hello-world/node_modules' directory. But, the actual package is the one you just cloned and linked.

When you develop within the npm package code, you can test it in the '/hello-world'

## Deploying to Production

Hosted on heroku, initial deployment means:

- use meteor horse buildpack
- enable session affinity
- add free mongolab
- set ROOT_URL
- set METEOR_SETTINGS env 'heroku config:add METEOR_SETTINGS="$(cat settings-production.json)'
- seed hello-world project 'Meteor.call('projects.seed', {})'

### Based on Pup

[Read the Documentation](http://cleverbeagle.com/pup)
