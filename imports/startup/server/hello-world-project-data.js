export default {
  author: 'Mark Hurwitz',
  title: 'Hello World',
  slug: 'hello-world',
  description: 'This is the very first ducktypecoder project',
  steps: [
    {
      order: 1,
      tests: `
it('runs with ducktypecoder', () => {
  expect(true).toEqual(true);
});
      `,
      content: `
<h2 id="step1setup">Step 1: Setup</h2>

<p>Welcome to ducktypecoder!  In this step, we will setup our first project.</p>

<p>Create a new directory, name it 'hello-world'</p>

<p>
$ mkdir hello-world
</p>

<p>Change into that directory and create a file: ducktypecoder.js</p>

<p>
$ cd hello-world &amp;&amp; touch ducktypecoder.js
</p>

<p>In that file, export and object containingyour ducktypecoder token and the project name:</p>

<p>
modules.export = {
  token: <yourtokenhere>,
  project: 'hello-world'
}</p>

<p>// ducktypecoder.js
</p>

<p>Initialize the project as an npm project:</p>

<p>
$ npm init
</p>

<p><em>add your info or just click enter for the defaults</em></p>

<p>Install the ducktypecoder npm package:</p>

<p>
npm install --save-dev ducktypecoder
</p>

<p>Run ducktypecoder and check your progress:</p>

<p>
$ ducktypecoder
</p>
`,
    },
    {
      order: 2,
      tests: `
// first, import the file:
var sayHello = require('./src/say-hello');

// second, test that it works:
it('says hello world', () => {
  expect(sayHello()).toEqual('Hello world');
});
      `,
      content: `
<h2 id="step2sayhello">Step 2: Say Hello</h2>

<p>In this step, we will add a function that says 'Hello world'.</p>

<p>First, create a new directory, '/src', and a file in that directory, 'say-hello.js':</p>

<p>$ mkdir /src &amp;&amp; touch say-hello.js</p>

<p>Open that file, and add a function that returns the string 'Hello world'.  Hint, that function might look like:</p>

<p>module.exports = function sayHello() {
  return 'Hello world';
};</p>

<p>This should pass. Run ducktype coder and see:</p>

<p>$ ducktypecoder</p>
      `,
    },
    {
      order: 3,
      tests: `
// first, import the file:
var sayMyName = require('./src/say-my-name');

// second, test that it works:
it('says my name', () => {
  const name = 'bob';
  expect(sayMyName(name)).toEqual(name);
});
      `,
      content: `
<h2 id="step3saymyname">Step 3: Say My Name</h2>

<p>Great! Let's make another function. This new function will accept an argument.</p>

<p>Make a file in '/src' named 'say-my-name.js' and in that file export a function that returns your name:</p>

<p>module.exports = function sayMyName(name) {
  return name;
};</p>

<p>Again, check with ducktypecoder:</p>

<p>$ ducktypecoder</p>
      `,
    },
    {
      order: 4,
      tests: `
var addNumbers = require('./src/add-numbers');

// second, test that it works:
it('adds numbers', () => {
  const num1 = 3;
  const num2 = 4;
  expect(addNumbers(num1, num2)).toEqual(7);
});
      `,
      content: `
<h2 id="step4addnumbers">Step 4: Add Numbers</h2>

<p>Next, add a function that adds 2 numbers, in '/src/add-numbers':</p>

<p>module.exports = function addNumbers(num1, num2) {
  return num1 + num2;
};</p>

<p>Run ducktypecoder:</p>

<p>$ ducktypecoder</p>
      `,
    },
    {
      order: 5,
      tests: `
// Now let's test that add number returns NaN if necessary
var addNumbers = require('./src/add-numbers');

it('returns NaN when appropriate', () => {
  const num1 = 3;
  const num2 = '4';

  expect(addNumbers(num1, num2)).toEqual(7);
});

      `,
      content: `
<h2 id="step5improvedaddnumbers">Step 5: Improved addNumbers</h2>

<p>Improve that last function so that it converts strings into numbers:</p>

<p>In '/src/add-numbers':</p>

<p>module.exports = function addNumbers(num1, num2) {
  return Number(num1) + Number(num2);
};</p>

<p>Should work, test it with ducktypecoder:</p>

<p>$ ducktypecoder</p>
      `,
    },
  ],
  finalMessage: `
<h2 id="youredone">You\'re done!</h2>

<p>Now you know how ducktypecoder works.</p>

<p>We'll be adding more useful tutorials. Each tutorial will walk you through real world projects with real tests to check your progress.</p>

<p>Thanks for trying ducktypecoder!</p>
  `,
};
