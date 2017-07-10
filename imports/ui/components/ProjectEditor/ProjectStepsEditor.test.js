import React from 'react';
import { mount, shallow } from 'enzyme';

import ProjectStepsEditor from './ProjectStepsEditor';
import ProjectStepInput from './ProjectStepInput';

const steps = [];
const addStep = function () {
  steps.push({ content: '' });
};
const removeStep = function () {};
const updateStep = function () {};
const clearSteps = function () {
  steps.length = 0;
};

beforeEach(() => {
  clearSteps();
});

it('mounts on the page', () => {
  expect(
    mount(
      <ProjectStepsEditor
        steps={steps}
        addStep={addStep}
        removeStep={removeStep}
        updateStep={updateStep}
      />,
    ).exists(),
  ).toEqual(true);
});

it('clicking Add Step adds a step', () => {
  const wrapper = mount(
    <ProjectStepsEditor
      steps={steps}
      addStep={addStep}
      removeStep={removeStep}
      updateStep={updateStep}
    />,
  );

  const addStepBtn = wrapper.find('[data-test="addStep"]');
  expect(steps.length).toBe(0);
  expect(addStepBtn.exists()).toBe(true);
  addStepBtn.simulate('click');
  expect(steps.length).toBe(1);
  addStepBtn.simulate('click');
  expect(steps.length).toBe(2);
});
