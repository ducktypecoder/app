import React from 'react';

import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import ProjectAuthorEditor from '../../components/ProjectEditor/ProjectAuthorEditor';
import ProjectSettingsEditor from '../../components/ProjectEditor/ProjectSettingsEditor';
import ProjectStepEditor from '../../components/ProjectEditor/ProjectStepEditor';

export default function ProjectEditorActiveSection(props) {
  const {
    doc,
    user,
    history,
    activeSidebarItem,
    steps,
    updateFinalMessage,
    updateTitle,
    updateDescription,
    updateProject,
    updateAuthor,
    publish,
    unpublish,
    addStep,
    removeStep,
    updateStep,
    toggleEditingStep,
  } = props;

  switch (activeSidebarItem) {
    case 'general':
      return (
        <ProjectEditor
          doc={doc}
          history={history}
          updateFinalMessage={updateFinalMessage}
          updateTitle={updateTitle}
          updateDescription={updateDescription}
          updateProject={updateProject}
        />
      );
    case 'author':
      return (
        <ProjectAuthorEditor author={doc.author} updateAuthor={updateAuthor} />
      );
    case 'settings':
      return (
        <ProjectSettingsEditor
          doc={doc}
          user={user}
          publish={publish}
          unpublish={unpublish}
        />
      );
    default:
      const stepIndex = Number(activeSidebarItem.replace('step-', '')) - 1;
      const step = steps[stepIndex];

      return (
        <ProjectStepEditor
          key={stepIndex}
          step={step}
          content={step.content}
          tests={step.tests}
          index={stepIndex}
          addStep={addStep}
          removeStep={removeStep}
          updateStep={updateStep}
          toggleEditingStep={toggleEditingStep}
          project={doc}
        />
      );
  }
}
