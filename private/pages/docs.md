## For students
---------------

Start a tutorial and ducktypecoder will help you step-by-step, testing your code as you go.

## *ducktypecoder* start \<url\>

Given a url that points to a ducktypecoder project, command clones that project, checks out a 'working' branch, and instructs you to change into that new directory.

Example:

```
$ ducktypecoder start https://github.com/ducktypecoder/hello-world
```

## *ducktypecoder* next

Checks which step you are working on and runs that step's tests against your code. If the tests all pass, this command will fetch the content and tests for the next step, copy them into your local ```/ducktypecoder``` folder and update your ducktypecoder config.

If the tests fail, this command shows you the error messages. Run it again when you have fixed the errors.

Anytime you want to progress to the project's next step, run this command.

## *ducktypecoder* info

Shows info about the current step and its content.

## *ducktypecoder* view

Opens the current step's content in your web browser.

## For authors
--------------

Tell ducktypecoder when you want to add a step, and answer for the step, or the concluding message. ducktypecoder handles the branching and boilerplate, you provide the content.

## *ducktypecoder* init

Creates the ```/ducktypecoder``` directory and some files therein, ```config.json```, ```content.md``` and ```tests.js```.

Requests input that ducktypecoder will add to the ```config.json```.

You should be on the 'master' branch. After running this command, add your introductory message in ```content.md```, and then you might run **$ ducktypecoder add step**.

## *ducktypecoder* add step

Checks out a new branch titled 'ducktypecoder-step-1'.  If you have *n* steps already, this will make the branch titled accordingly 'ducktypecoder-step-*n + 1*'.

This will overwrite the your ducktypecoder content and tests with boilerplate to start. You should add content that guides your student through this new step. You should add tests that will validate that the student has correctly implemented this step.

## *ducktypecoder* add answer

Checks out a new branch titled according to your current step. If you are on step 1, this will create a branch titled 'ducktypecoder-step-1-answer'.

In this branch, you should edit the project's code so that this step's tests pass.

## *ducktypecoder* add conclusion

Checks out a new branch titled 'ducktypecoder-conclusion' and leaves you with a boilerplate conclusion in ```content.md```.

When you are done writing all your steps and answers, you finish with a conclusion. Congratulate the student, remind them what they learned, and present some additional like your next tutorial.

### Not yet implemented:

For author, commands that navigate to specific steps for editing:

- edit step *n*
- edit answer *n*
- edit conclusion
- edit intro

For student, commands that navigate through the tutorial

- goto step *n*
- goto intro
- goto conclusion
- see answer

For anyone, command to run the tests in ```/ducktypecoder/tests.js``` against the current working code:

- run tests
