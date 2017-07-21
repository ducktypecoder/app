import React from 'react';

import { Nav, NavItem } from 'react-bootstrap';

export default class ProjectEditorSideNav extends React.Component {
  constructor() {
    super();

    this.handleSectionSelect = this.handleSectionSelect.bind(this);
  }

  handleSectionSelect(key) {
    const {
      doc,
      addStep,
      updateActiveSidebarItem,
      updateProject,
      history,
    } = this.props;

    const data = {
      _id: doc._id,
      title: doc.title,
      author: doc.author,
      description: doc.description,
      finalMessage: doc.finalMessage,
      steps: doc.steps,
    };

    switch (key) {
      case 'addStep':
        addStep();
        return;
      case 'general':
        updateActiveSidebarItem('general');
        return;
      case 'settings':
        updateActiveSidebarItem('settings');
        return;
      case 'view':
        updateProject(data);
        history.push(`/projects/${data._id}`);
        return;
      case 'save':
        updateProject(data);
        return;
      default:
        updateActiveSidebarItem(key);
        this.forceUpdate();
    }
  }

  render() {
    const { steps, activeSidebarItem } = this.props;

    return (
      <Nav
        bsStyle="pills"
        stacked
        activeKey={activeSidebarItem}
        onSelect={this.handleSectionSelect}
      >
        <NavItem eventKey="general"> General </NavItem>
        <NavItem eventKey="author"> Author </NavItem>
        <NavItem eventKey="settings"> Settings </NavItem>
        {steps.map((s, i) =>
          (<NavItem key={i} eventKey={`step-${i + 1}`}>
            Step {i + 1}
          </NavItem>),
        )}
        <NavItem eventKey="addStep"> + Add Step </NavItem>
        <NavItem eventKey="view"> Save & View &rarr; </NavItem>
        <NavItem eventKey="save"> Save </NavItem>
      </Nav>
    );
  }
}
