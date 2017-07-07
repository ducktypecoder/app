export default {
  author: 'Mark Hurwitz',
  title: 'Hello World',
  slug: 'hello-world',
  description: 'This is the very first ducktypecoder project',
  steps: [
    {
      order: 1,
      content: `
## Step 1: Setup

Welcome to ducktypecoder!  In this step, we will setup our first project.

Create a new directory, name it 'hello-world'

\`\`\`
$ mkdir hello-world
\`\`\`

Change into that directory and create a file: ducktypecoder.js

\`\`\`
$ cd hello-world && touch ducktypecoder.js
\`\`\`


In that file, export and object containingyour ducktypecoder token and the project name:

\`\`\`
modules.export = {
  token: <yourtokenhere>,
  project: 'hello-world'
}

// ducktypecoder.js
\`\`\`

Initialize the project as an npm project:

\`\`\`
$ npm init
\`\`\`

_add your info or just click enter for the defaults_

Install the ducktypecoder npm package:

\`\`\`
npm install --save-dev ducktypecoder
\`\`\`

Run ducktypecoder and check your progress:

\`\`\`
$ ducktypecoder
\`\`\`
`,
    },
    {
      order: 2,
      content: `
## Step 2: Say Hello

In this step, we will add a function that says 'Hello world'.

First, create a new directory, '/src', and a file in that directory, 'say-hello.js':

\`\`\`
$ mkdir /src && touch say-hello.js
\`\`\`

Open that file, and add a function that returns the string 'Hello world'.  Hint, that function might look like:

\`\`\`
module.exports = function sayHello() {
  return 'Hello world';
};
\`\`\`

This should pass. Run ducktype coder and see:

\`\`\`
$ ducktypecoder
\`\`\`
      `,
    },
    {
      order: 3,
      content: `
## Step 3: Say My Name

Great! Let's make another function. This new function will accept an argument.

Make a file in '/src' named 'say-my-name.js' and in that file export a function that returns your name:

\`\`\`
module.exports = function sayMyName(name) {
  return name;
};
\`\`\`

Again, check with ducktypecoder:

\`\`\`
$ ducktypecoder
\`\`\`
      `,
    },
    {
      order: 4,
      content: `
## Step 4: Add Numbers

Next, add a function that adds 2 numbers, in '/src/add-numbers':

\`\`\`
module.exports = function addNumbers(num1, num2) {
  return num1 + num2;
};
\`\`\`

Run ducktypecoder:

\`\`\`
$ ducktypecoder
\`\`\`
      `,
    },
    {
      order: 5,
      content: `
## Step 5: Improved addNumbers

Improve that last function so that it converts strings into numbers:

In '/src/add-numbers':

\`\`\`
module.exports = function addNumbers(num1, num2) {
  return Number(num1) + Number(num2);
};
\`\`\`

Should work, test it with ducktypecoder:

\`\`\`
$ ducktypecoder
\`\`\`
      `,
    },
  ],
  finalMessage: `
## You\'re done!

Now you know how ducktypecoder works.

We'll be adding more useful tutorials. Each tutorial will walk you through real world projects with real tests to check your progress.

Thanks for trying ducktypecoder!
  `,
};
