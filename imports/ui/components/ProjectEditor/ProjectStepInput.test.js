import React from 'react';
import { mount, shallow } from 'enzyme';

import ProjectStepInput from './ProjectStepInput';

const updateStep = jest.fn();

it('renders with shallow', () => {
  ProjectStepInput.prototype.onEditorStateChange = jest.fn();
  const wrapper = shallow(<ProjectStepInput updateStep={updateStep} />);
  expect(wrapper.exists()).toBe(true);
});
